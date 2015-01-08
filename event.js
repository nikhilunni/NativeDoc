var condition1 = new chrome.declarativeWebRequest.RequestMatcher({
          url: { urlSuffix: '.docx' } });
      var condition2 = new chrome.declarativeWebRequest.RequestMatcher({
          url: { urlSuffix: '.pptx' } });

var rule = { conditions: [condition1, condition2],
             actions: [new chrome.declarativeWebRequest.CancelRequest(),
                       ]};

chrome.declarativeWebRequest.onRequest.addRules([rule]);