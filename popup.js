let toggle_btn = document.getElementById("toggle-btn");
chrome.storage.sync.get({wfh:false}, function(data) {
  if (data.wfh) {
    // set true
    chrome.storage.sync.set({wfh: true}, function() {
      toggle_btn.classList.add("active");
      document.getElementById("status").innerHTML = "On";
    });
  } else {
    chrome.storage.sync.set({wfh: false}, function() {
      toggle_btn.classList.remove("active");
      document.getElementById("status").innerHTML = "Off";
    });
  }
});

toggle_btn.addEventListener('click', function() {
  chrome.storage.sync.get({wfh:false}, function(data) {
    if (data.wfh) {
      // set true
      chrome.storage.sync.set({wfh: false}, function() {
        toggle_btn.classList.remove("active");
        document.getElementById("status").innerHTML = "Off";
      });
    } else {
      chrome.storage.sync.set({wfh: true}, function() {
        toggle_btn.classList.add("active");
        document.getElementById("status").innerHTML = "On";
      });
    }
  });
})
