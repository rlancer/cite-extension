/*
console.log("popup.js", 'popup script working');

function onPopupLoad(){
    chrome.tabs.query({currentWindow: true, active: true}, (tabs)=> {
        chrome.tabs.sendMessage(tabs[0].id, {text: 'report_back'}, this.doStuffWithDom);
    });
    console.log("popup.js", 'popup onLoad');
}

document.addEventListener('DOMContentLoaded', onPopupLoad, false);
*/