chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    chrome.storage.sync.get('wfh', function(data) {
      if (data.wfh) {
        // set true
        chrome.tabs.executeScript(tabId, {file:"content.js"});
      }
    });
  }
})
