let settings;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  settings = request;
  sendResponse({});
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    if (!settings || !settings.headers) {
      return;
    }
    try {
      const json = JSON.parse(settings.headers);
      for (const [key, value] of Object.entries(json)) {
        details.requestHeaders.push({
          name: key,
          value: value,
        });
      }
    } catch (error) {
      console.log(error);
    }
    return { requestHeaders: details.requestHeaders };
  },
  {
    urls: [
      settings === undefined || settings.url_pattern === undefined
        ? "<all_urls>"
        : settings.url_pattern,
    ],
  },
  ["blocking", "requestHeaders"]
);
