chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return {redirectUrl: 'http://docs.google.com/viewer?url='+details.url+'&embedded=true'};
}, {
    urls: ['*://*/*.docx', '*://*/*.doc', '*://*/*.pptx', '*://*/*.ppt']
}, ['blocking']);