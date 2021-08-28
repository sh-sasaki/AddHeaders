let settings;
loadData();

function loadData() {
  chrome.storage.local.get(["addheaders"], function (obj) {
    settings = obj.addheaders;

    if (!settings) {
      settings = [{ headers: "", url_pattern: "" }];
      chrome.storage.local.set({ addheaders: settings }, function () {});
      return;
    }
    document.getElementById("headers").value = settings.headers ?? "";
    document.getElementById("url_pattern").value = settings.url_pattern ?? "";
  });
}

let button = document.getElementById("save");
button.addEventListener("click", function () {
  settings = {
    headers: document.getElementById("headers").value,
    url_pattern: document.getElementById("url_pattern").value,
  };
  chrome.runtime.sendMessage(settings, (receive) => {});
  chrome.storage.local.set({ addheaders: settings }, function () {
    alert("保存しました。");
  });
});
