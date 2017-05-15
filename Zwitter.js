// Moving the display name and user name
var namename = document.querySelector('.ProfileHeaderCard-name');
namename.parentNode.removeChild(namename);
var usrnm = document.createElement('div');
usrnm.id = 'mynameis';
usrnm.innerHTML = namename.innerHTML;

var pgnm = document.getElementById('page-container');
pgnm.insertBefore(usrnm, pgnm.firstChild);
var athandle = document.querySelector('.ProfileHeaderCard-screenname');
usrnm.innerHTML += ('<div>' + athandle.innerHTML + '</div>'); 

// Moving the Follow Button
var followBtn = document.querySelector('.ProfileNav'); 
followBtn.parentNode.removeChild(followBtn);
usrnm.innerHTML+= '<div id="followholder">' + followBtn.innerHTML + '</div>';
document.querySelector('.user-actions-follow-button.js-follow-btn.follow-button.btn').className = "user-actions-follow-button js-follow-btn follow-button";
document.querySelector('.ProfileNav-item.ProfileNav-item--userActions.u-floatRight.u-textRight.with-rightCaret').className = "ProfileNav-item ProfileNav-item--userActions";

// OPTIONS

// OPTIONS -- helper functions to iterate on every element with a specified class
function replaceFromClasses(classes, replacement) {
  var els = document.getElementsByClassName(classes);
  for(var i = 0, length = els.length; i < length; i++) {
    els[i].innerHTML = replacement;
  }
}

function tagRemover(tags) {
  var ells = document.getElementsByTagName(tags);
for (var i = 0, length = ells.length; i < 0; index++) {
    ells[index].parentNode.removeChild(ells[index]);
}
}

function classRemover(classes) {
  var ells = document.getElementsByClassName(classes), index;
for (var i = 0, length = ells.length; i < 0; index++) {
    ells[index].parentNode.removeChild(ells[index]);
  }
}

//OPTIONS -- removing images and video
function textualize() {
chrome.storage.sync.get('onlytext', function(items) {
	if (items.onlytext == true) {
			var link = document.createElement('link');
 		link.setAttribute('rel', 'stylesheet');
  		link.type = 'text/css';
  		link.href = chrome.extension.getURL('zwext.css');
  		document.head.appendChild(link);
      tagRemover("img");
      classRemover("tcu-imageWrapper");
	};  
});
}; 

function anonymize(classes,) {
	replaceFromClasses(classes, "Anonymous");
}

//OPTIONS -- anonymizing, i.e. Zwitternonymous
function zwitnon() {
chrome.storage.sync.get('noname', function(items) {
	if (items.noname == true) {
		var link = document.createElement('link');
 		link.setAttribute('rel', 'stylesheet');
  		link.type = 'text/css';
  		link.href = chrome.extension.getURL('znon.css');
  		document.head.appendChild(link);
  		document.title ="Twitter"; 
  		anonymize('ProfileHeaderCard-nameLink');
  		anonymize('fullname'); 
  		anonymize('fullname show-popup-with-id');
  		anonymize('pretty-link js-user-profile-link');
  		anonymize('QuoteTweet-fullname');
      // For the tweet pop ups
      anonymize('twitter-atreply pretty-link js-nav');
	};
});
};

// OPTIONS -- applying the options preferences. 
textualize(); 
zwitnon(); 

//Below is an admittedly patchwork solution for applying the options to the new content loaded.
// Ideally I'll identify an event to listen to that indicates new tweets / a new page has been loaded.

window.addEventListener('scroll', zwitnon); 
window.addEventListener('mousewheel', zwitnon);
window.addEventListener('scroll', textualize);
window.addEventListener('mousewheel', textualize);