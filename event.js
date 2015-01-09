var dictionary = {};
var prefix =  'docs.google.com/viewer?url=';


chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var oldUrl = null;
    chrome.tabs.get(details.tabId,
                    function(tab) {
                        oldUrl = tab.url;
                        chrome.extension.getBackgroundPage().console.log(oldUrl);                        
                    });
    chrome.extension.getBackgroundPage().console.log("NOT TAB");
    return {redirectUrl: 'http://docs.google.com/viewer?url='+details.url+'&embedded=false'};

    
}, {
    urls: ['*://*/*.docx', '*://*/*.doc', '*://*/*.pptx', '*://*/*.ppt']
}, ['blocking']);