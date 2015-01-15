var dictionary = {};
var prefix =  'drive.google.com/viewerng/viewer?url=';
var suffix = '&embedded=true';

chrome.webRequest.onBeforeRequest.addListener(function(details) {

    var lastUrl = dictionary[details.tabId];
    var result;
    dictionary[details.tabId] = details.url;
    if(details.url.match(/\.(doc|ppt)x?$/)) {
        if(lastUrl == 'http://'+prefix+details.url+suffix ||
            lastUrl == 'https://'+prefix+details.url+suffix) {
            return {cancel : false};
        }
        else {
            return {redirectUrl: 'https://'+prefix+details.url+suffix};
        }
    }
    else {
        return {cancel : false};
    }
    
}, {
    urls: ["<all_urls>"], types : ["main_frame"]
}, ['blocking']);


chrome.webNavigation.onCompleted.addListener(function(details){

	if(details.url.indexOf(prefix) >= 0 && details.url.indexOf(suffix) >= 0)
	{
	    chrome.tabs.insertCSS(details.tabId, {file: "./updates.css"});

      if(details.url.match(/\.pptx?&embedded=true$/))
      {
          chrome.tabs.insertCSS(details.tabId, {file: "./landscape.css"});
      }
      else
      {
          chrome.tabs.insertCSS(details.tabId, {file: "./portrait.css"});
      }

	    chrome.tabs.executeScript(details.tabId, {file: "./jquery.js"});
	    chrome.tabs.executeScript(details.tabId, {file: "./injection.js"});

	}
});


chrome.webRequest.onHeadersReceived.addListener(
      function(details) {
          //Intercept all headers with BLOB url, and feed it to our js scripts
          if(details.url.match(/drive\.google\.com\/viewerng\/img\?/)) {
              var url = details.url.substr(0,details.url.length-1);
              chrome.tabs.executeScript(details.tabId,
                                        {code: ('var nativeDoc_blob="'+url+'";')});
          }
          return {responseHeaders: details.responseHeaders};
      },
      {urls: ["<all_urls>"]},
      ["blocking", "responseHeaders"]);