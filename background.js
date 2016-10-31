var bkg = chrome.extension.getBackgroundPage();	
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
    bkg.console.log(response);
    var temp = {};
    temp["url"] = response;
    chrome.tabs.create(temp);
});
