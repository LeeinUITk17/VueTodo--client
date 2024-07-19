
import { browser } from "wxt/browser";
// chrome.webNavigation.onCompleted.addListener((details) => {
//   if (details.url && details.url.includes("chat.openai.com")) {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       if (tabs[0].id) {
//         chrome.scripting.executeScript({
//           target: { tabId: tabs[0].id },
//           files: ['content.js']
//         });
//       }
//     });
//   }
// }, { url: [{ urlContains: 'chat.openai.com' }] });


chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});
browser.runtime.onInstalled.addListener(() => {
  browser.tabs.create({
    url: 'https://chatgpt.com'
  });
}); 

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id as number },
    files: ['content.js']
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fillPrompt') {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab?.id as number },
      func: (prompt) => {
        const textarea = document.querySelector('textarea');
        if (textarea) {
          textarea.value = prompt;
          const inputEvent = new Event('input', { bubbles: true });
          textarea.dispatchEvent(inputEvent);
        }
      },
      args: [message.prompt]
    });
  }
});
const STORAGEKEYS = "Prompt";


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "savePrompt") {
    chrome.storage.local.set({
      [STORAGEKEYS]: request.data
    }, () => {
      console.log("Prompt saved", request.data);
      sendResponse({ status: "success" });
    });
    return true; 
  } else if (request.action === "getPrompts") {
    chrome.storage.local.get([STORAGEKEYS], (result) => {
      console.log("Prompt fetched", result[STORAGEKEYS]);
      sendResponse(result[STORAGEKEYS] || []);
    });
    return true; 
  }
});



