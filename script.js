// Work From Home
// Eric Zhong
// ericzhong.com
// enjoy

var page_height;
;(function() {
    var pageHeight = 0;

    function findHighestNode(nodesList) {
        for (var i = nodesList.length - 1; i >= 0; i--) {
            if (nodesList[i].scrollHeight && nodesList[i].clientHeight) {
                var elHeight = Math.max(nodesList[i].scrollHeight, nodesList[i].clientHeight);
                pageHeight = Math.max(elHeight, pageHeight);
            }
            if (nodesList[i].childNodes.length) findHighestNode(nodesList[i].childNodes);
        }
    }

    findHighestNode(document.documentElement.childNodes);

    // The entire page height is found
    // console.log('Page height is', pageHeight);
    page_height = pageHeight;
})();

const headlines = ["Scroll further and risk passing the point of no return.", "Better switch tabs now so your boss doesn't catch you!"
, "How's your vacation at home going?", "Is it break time yet?", "Your microphone isn't muted, we can still hear you." ,
"You really get paid to do this?", "You aren't fooling anyone. Get back on Skype."]

function getRandomElement (arr) {
  if (arr && arr.length) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

// var keys = {37: 1, 38: 1, 39: 1, 40: 1};
//
// function preventDefault(e) {
//   e = e || window.event;
//   if (e.preventDefault)
//       e.preventDefault();
//   e.returnValue = false;
// }
//
// function preventDefaultForScrollKeys(e) {
//     if (keys[e.keyCode]) {
//         preventDefault(e);
//         return false;
//     }
// }
//
// function stopScroll() {
//   if (window.addEventListener) // older FF
//       window.addEventListener('DOMMouseScroll', preventDefault, false);
//   document.addEventListener('wheel', preventDefault, {passive: false}); // Disable scrolling in Chrome
//   window.onwheel = preventDefault; // modern standard
//   window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
//   window.ontouchmove  = preventDefault; // mobile
//   document.onkeydown  = preventDefaultForScrollKeys;
// }

var infiniteScroll = false;
var dist_down = 0;
var dist_up = 0;
var down_prev, up_prev = false;
const scrollFactor = 1.2; // buffer - some margin errors

var initial_docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;

var h,
de = document.documentElement;
if (self.innerHeight) {h = window.innerHeight;}
else if (de && de.clientHeight) {h = de.clientHeight;}
else if (document.body) {h = document.body.clientHeight;}

var scrollDistance = function (callback, refresh) {
	// Make sure a valid callback was provided
	if (!callback || typeof callback !== 'function') return;
	// Variables
	var isScrolling, start, end, distance;
	// Listen for scroll events
	window.addEventListener('scroll', function (event) {
		// Set starting position
		if (!start) {
			start = window.pageYOffset;
		}
		// Clear our timeout throughout the scroll
		window.clearTimeout(isScrolling);
		// Set a timeout to run after scrolling ends
		isScrolling = setTimeout(function() {
			// Calculate distance
			end = window.pageYOffset;
			distance = end - start;
			// Run the callback
			callback(distance, start, end);
			// Reset calculations
			start = null;
			end = null;
			distance = null;

		}, refresh || 66);

	}, false);
};

function startScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    document.removeEventListener('wheel', preventDefault, {passive: false}); // Enable scrolling in Chrome
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}

function disableScroll() {
  var body = document.body;
  // try fade:
  if(document.getElementById("bottom_fade") !== null){
    return;
  }
  var bottom_fade = document.createElement("div");
  bottom_fade.id = "bottom_fade";
  // bottom_fade.style.textAlign = "center";
  var text = document.createElement("span");
  text.style.fontFamily = "-apple-system, BlinkMacSystemFont, sans-serif";
  text.style.fontStyle = "normal";
  text.innerHTML = getRandomElement(headlines) + ' <a style="color: #ff6b6b; font-weight: 600;" href="https://google.com">Go be productive!</a>'
  text.style.position = "fixed";
  text.style.fontSize = "16px";
  text.style.fontWeight = "500";
  text.style.bottom = "5%";
  // text.style.marginLeft = "auto";
  // text.style.marginRight = "auto";
  // text.style.display = "block";
  // text.style.left = "50%";
  text.style.left = "50%";
  text.style.transform = "translateX(-50%)";
  bottom_fade.style.zIndex = 99;
  bottom_fade.style.width = "100%";
  bottom_fade.style.height = "100%";
  bottom_fade.style.position = "fixed";
  bottom_fade.style.bottom = "0%";
  bottom_fade.style.background = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAADICAYAAAA0n5+2AAAAAXNSR0IB2cksfwAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAD4klEQVR4Xu3csQ3DMBAEwafF/luWE0cM6Q1nACeqYHF+ab3vOwAAdD7nAwAA/iOwAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAILZFFgBAa8/MOh8CAHBPYAEAxPw9CAAQs2ABAMQEFgBATGABAMR8pgEAICauAABiFiwAgJi4AgCIWbAAAGICCwAgJrAAAGJ7Zp7zIQAA9yxYAAAxgQUAEBNYAAAxgQUAEBNYAAAxgQUAENu/HwAAEQsWAEDMh0YBAGIWLACAmAULACBmwQIAiFmwAABiFiwAgJjAAgCICSwAgJgvuQMAxCxYAAAxCxYAQMyCBQAQs2ABAMT2zKzzIQAA9yxYAAAxN1gAADELFgBAzA0WAEDMggUAEHODBQAQs2ABAMTcYAEAxCxYAAAxN1gAADELFgBAzIIFABCzYAEAxCxYAAAxgQUAEBNYAAAxN1gAADELFgBAzIIFABCzYAEAxCxYAACxPTPrfAgAwD0LFgBAzA0WAEDMggUAELNgAQDEBBYAQGzPzHM+BADgngULACBmwQIAiFmwAABiFiwAgJjAAgCI+YsQACAmsAAAYgILACAmsAAAYgILACDmLUIAgJjAAgCICSwAgJgbLACAmMACAIgJLACAmMACAIgJLACAmMACAIjtmVnnQwAA7lmwAABiPjQKABCzYAEAxNxgAQDELFgAADGBBQAQE1gAADE3WAAAMQsWAEDMggUAELNgAQDEBBYAQExgAQDExBUAQMyCBQAQ8xYhAEDMggUAELNgAQDELFgAADFxBQAQs2ABAMTcYAEAxCxYAAAxcQUAELNgAQDExBUAQMyCBQAQE1cAADELFgBAzHewAABi1isAgJgFCwAgZsECAIhZsAAAYt4iBACIWbAAAGLWKwCAmAULACBmwQIAiFmwAABiFiwAgJgFCwAgZsECAIhZsAAAYhYsAICYBQsAIGbBAgCIWbAAAGIWLACAmMACAIgJLACAmBssAICYBQsAICawAABiAgsAIOYGCwAgZsECAIgJLACAmMACAIgJLACAmMACAIh5ixAAIGbBAgCICSwAgJjAAgCICSwAgJjAAgCICSwAgJjAAgCICSwAgJjAAgCICSwAgJjAAgCICSwAgJjAAgCICSwAgJjAAgCICSwAgJjAAgCIfQG6FwZ84Ly+DAAAAABJRU5ErkJggg==') bottom center no-repeat";
  bottom_fade.style.backgroundSize = "100%";

  // if body has other color than white
  if(body.style.backgroundColor !== "" || window.getComputedStyle( document.body, null).getPropertyValue("background-color") !== undefined) {
    if(window.getComputedStyle( document.body, null).getPropertyValue("background-color") !== undefined){
      var overlay = window.getComputedStyle( document.body, null).getPropertyValue("background-color").replace(/\)/, ', 0.7)');
    }
    else {
      var overlay = String(body.style.backgroundColor).replace(/\)/, ', 0.7)')
    }
    bottom_fade.style.background = `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAADICAYAAAA0n5+2AAAAAXNSR0IB2cksfwAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAD4klEQVR4Xu3csQ3DMBAEwafF/luWE0cM6Q1nACeqYHF+ab3vOwAAdD7nAwAA/iOwAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAILZFFgBAa8/MOh8CAHBPYAEAxPw9CAAQs2ABAMQEFgBATGABAMR8pgEAICauAABiFiwAgJi4AgCIWbAAAGICCwAgJrAAAGJ7Zp7zIQAA9yxYAAAxgQUAEBNYAAAxgQUAEBNYAAAxgQUAENu/HwAAEQsWAEDMh0YBAGIWLACAmAULACBmwQIAiFmwAABiFiwAgJjAAgCICSwAgJgvuQMAxCxYAAAxCxYAQMyCBQAQs2ABAMT2zKzzIQAA9yxYAAAxN1gAADELFgBAzA0WAEDMggUAEHODBQAQs2ABAMTcYAEAxCxYAAAxN1gAADELFgBAzIIFABCzYAEAxCxYAAAxgQUAEBNYAAAxN1gAADELFgBAzIIFABCzYAEAxCxYAACxPTPrfAgAwD0LFgBAzA0WAEDMggUAELNgAQDEBBYAQGzPzHM+BADgngULACBmwQIAiFmwAABiFiwAgJjAAgCI+YsQACAmsAAAYgILACAmsAAAYgILACDmLUIAgJjAAgCICSwAgJgbLACAmMACAIgJLACAmMACAIgJLACAmMACAIjtmVnnQwAA7lmwAABiPjQKABCzYAEAxNxgAQDELFgAADGBBQAQE1gAADE3WAAAMQsWAEDMggUAELNgAQDEBBYAQExgAQDExBUAQMyCBQAQ8xYhAEDMggUAELNgAQDELFgAADFxBQAQs2ABAMTcYAEAxCxYAAAxcQUAELNgAQDExBUAQMyCBQAQE1cAADELFgBAzHewAABi1isAgJgFCwAgZsECAIhZsAAAYt4iBACIWbAAAGLWKwCAmAULACBmwQIAiFmwAABiFiwAgJgFCwAgZsECAIhZsAAAYhYsAICYBQsAIGbBAgCIWbAAAGIWLACAmMACAIgJLACAmBssAICYBQsAICawAABiAgsAIOYGCwAgZsECAIgJLACAmMACAIgJLACAmMACAIh5ixAAIGbBAgCICSwAgJjAAgCICSwAgJjAAgCICSwAgJjAAgCICSwAgJjAAgCICSwAgJjAAgCICSwAgJjAAgCICSwAgJjAAgCICSwAgJjAAgCIfQG6FwZ84Ly+DAAAAABJRU5ErkJggg==') ${overlay} bottom center no-repeat`;
    bottom_fade.style.backgroundSize = "cover";
    // bottom_fade.style.boxShadow = `inset 0 0 0 2000px ${String(body.style.backgroundColor).replace(/\)/, ', 0.5)')}`;
    bottom_fade.style.backgroundBlendMode = "multiply";

    console.log(body.style.backgroundColor);
  }
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // dark mode
      console.log("Dark modeeee!");
      text.style.color = "#f8f9fa";
      bottom_fade.style.background = `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAADICAYAAAA0n5+2AAAAAXNSR0IB2cksfwAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAD4klEQVR4Xu3csQ3DMBAEwafF/luWE0cM6Q1nACeqYHF+ab3vOwAAdD7nAwAA/iOwAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAICawAABiAgsAILZFFgBAa8/MOh8CAHBPYAEAxPw9CAAQs2ABAMQEFgBATGABAMR8pgEAICauAABiFiwAgJi4AgCIWbAAAGICCwAgJrAAAGJ7Zp7zIQAA9yxYAAAxgQUAEBNYAAAxgQUAEBNYAAAxgQUAENu/HwAAEQsWAEDMh0YBAGIWLACAmAULACBmwQIAiFmwAABiFiwAgJjAAgCICSwAgJgvuQMAxCxYAAAxCxYAQMyCBQAQs2ABAMT2zKzzIQAA9yxYAAAxN1gAADELFgBAzA0WAEDMggUAEHODBQAQs2ABAMTcYAEAxCxYAAAxN1gAADELFgBAzIIFABCzYAEAxCxYAAAxgQUAEBNYAAAxN1gAADELFgBAzIIFABCzYAEAxCxYAACxPTPrfAgAwD0LFgBAzA0WAEDMggUAELNgAQDEBBYAQGzPzHM+BADgngULACBmwQIAiFmwAABiFiwAgJjAAgCI+YsQACAmsAAAYgILACAmsAAAYgILACDmLUIAgJjAAgCICSwAgJgbLACAmMACAIgJLACAmMACAIgJLACAmMACAIjtmVnnQwAA7lmwAABiPjQKABCzYAEAxNxgAQDELFgAADGBBQAQE1gAADE3WAAAMQsWAEDMggUAELNgAQDEBBYAQExgAQDExBUAQMyCBQAQ8xYhAEDMggUAELNgAQDELFgAADFxBQAQs2ABAMTcYAEAxCxYAAAxcQUAELNgAQDExBUAQMyCBQAQE1cAADELFgBAzHewAABi1isAgJgFCwAgZsECAIhZsAAAYt4iBACIWbAAAGLWKwCAmAULACBmwQIAiFmwAABiFiwAgJgFCwAgZsECAIhZsAAAYhYsAICYBQsAIGbBAgCIWbAAAGIWLACAmMACAIgJLACAmBssAICYBQsAICawAABiAgsAIOYGCwAgZsECAIgJLACAmMACAIgJLACAmMACAIh5ixAAIGbBAgCICSwAgJjAAgCICSwAgJjAAgCICSwAgJjAAgCICSwAgJjAAgCICSwAgJjAAgCICSwAgJjAAgCICSwAgJjAAgCICSwAgJjAAgCIfQG6FwZ84Ly+DAAAAABJRU5ErkJggg==') rgb(0,0,0, 0.7) bottom center no-repeat`;
      bottom_fade.style.backgroundSize = "cover";
      // bottom_fade.style.boxShadow = `inset 0 0 0 2000px ${String(body.style.backgroundColor).replace(/\)/, ', 0.5)')}`;

      bottom_fade.style.backgroundBlendMode = "multiply";
  }
  bottom_fade.appendChild(text);
  body.insertBefore(bottom_fade, document.body.firstChild);
  dist_down = 0;
}

scrollDistance(function (distance) {
  // only count continuous
  distance < 0 ? dist_down -= parseInt(Math.abs(distance),10) : dist_down += parseInt(Math.abs(distance),10);
  // console.log(`Total scroll down: ${dist_down}`);
  // console.log(`Total scroll down: ${dist_up}`);

  dist_down > (page_height * scrollFactor) ?  infiniteScroll = true : infiniteScroll = false;

  if(infiniteScroll){
    // console.log("Infinite Scroll Detected!")
    disableScroll();
  }
});
