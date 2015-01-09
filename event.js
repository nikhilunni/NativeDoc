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