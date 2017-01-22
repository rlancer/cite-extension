/*
chrome.contextMenus.create({
    id: "citeshare_cx_menu",
    title: "Cite selected text using CiteShare", 
    contexts:["selection"], 
    onclick: getSelection
});

getSelection = (info, tab) => {
    this.log("Word " + info.selectionText + " was clicked.");
    
    chrome.tabs.create({  
        url: "chrome-extension://gldpenmgobgklgabnopjpededfgmckjm/popup.js" + info.selectionText,
    });  
};

log = (object) => {
    console.log('background.js', object);
    //chrome.extension.getBackgroundPage().console.log('content.js: ' + object);
};
*/

/*
const bluebird = require('bluebird');
global.Promise = bluebird;

function promisifier(method) {
  // return a function
  return function promisified(...args) {
    // which returns a promise
    return new Promise(resolve => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

// let chrome extension api support Promise
promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction',
  'contextMenus'
]);
promisifyAll(chrome.storage, [
  'local',
]);

require('./background/contextMenus');
require('./background/inject');
*/

