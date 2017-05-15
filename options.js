// Modelled on the Chrome extension tutorial page
// Saves options to chrome.storage
function save_options() {
  var zwnonChecked = document.getElementById('zwnonCheck').checked;
  var zwxtChecked = document.getElementById('zwextCheck').checked;
  chrome.storage.sync.set({onlytext: zwxtChecked, noname: zwnonChecked}, 
  function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1200);
  });
}

// Restores select box and checkbox state using the preferences stored in chrome.storage.
function restore_options() {
  // Setting default values
  chrome.storage.sync.get({onlytext: false, noname: false}, 
  function(items) {
    document.getElementById('zwextCheck').checked = items.onlytext;
    document.getElementById('zwnonCheck').checked = items.noname;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);