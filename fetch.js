console.log("Fetching");
document.onmouseup = document.onselectionchange = function() {
  	console.log(getSelectionText());
};
//key stroke detection
document.body.onkeydown = function(e) {
    var ev = e || event;var key = ev.keyCode;
    console.log("Key Pressed: " + key);
    if(key == 87){//wikipedia
    	if(getSelectionText() == null) return;
        chrome.runtime.sendMessage("https://en.wikipedia.org/wiki/" + query(getSelectionText()));
    }else if(key == 71){//Google
        if(getSelectionText() == null) return; 
        chrome.runtime.sendMessage("https://www.google.ca/search?q=" + query(getSelectionText()));
    }else if(key == 84){//Translate
        if(getSelectionText() == null) return;
        chrome.runtime.sendMessage("https://translate.google.com/#auto/en/" + query(getSelectionText()));
    }
}
// Utility Function
function query(input){
    input = input.trim();
    for(var x = 0;x < input.length;x++){
        var temp = input.charCodeAt(x);
        if(temp > 126) continue;
        if(temp == 32){
        	if(input.charCodeAt(x+1) == 32){
        		input = input.slice(0,x) + input.slice(x+1);x--;continue;
        	}
        	input = input.slice(0,x) + " " +input.slice(x+1);continue;
        }
        if((temp >= 48 && temp <= 57) || (temp >= 65 && temp <= 90) || (temp >= 97 && temp <= 122))continue;
        input = input.slice(0,x) + input.slice(x+1);x--;
    }
    return input; 
}
function getSelectionText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
      (activeElTagName == "textarea" || activeElTagName == "input") &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type) &&
      (typeof activeEl.selectionStart == "number")
    ) {
      text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    if(text == "" || text == undefined) return null;
    return text;
}