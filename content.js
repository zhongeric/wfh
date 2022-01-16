// content.js

(function() {

  var s = document.createElement('script');
  s.src = chrome.extension.getURL('script.js');
  console.log(s.src);
  (document.head||document.documentElement).appendChild(s);
  s.onload = function() {
      s.remove();
  };

})();
