
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
    files: ['src/content.js']
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background script received message:', message);
  if (message.action === 'fillPrompt') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id) {
        console.log('Found active tab:', tabs[0]);
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: (prompt) => {
            console.log('Executing script in content script with prompt:', prompt);
            const textarea = document.querySelector('textarea');
            if (textarea) {
              textarea.value = prompt;
              const inputEvent = new Event('input', { bubbles: true });
              textarea.dispatchEvent(inputEvent);
            }
          },
          args: [message.prompt]
        });
      } else {
        console.error('No active tab found');
      }
    });
  } else {
    console.error('Unknown action:', message.action);
  }
});

const STORAGEKEYS = "Prompt";
const USERKEYS="user";

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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
   if (request.action === "getuser") {
    chrome.storage.local.get([USERKEYS], (result) => {
      console.log("user background fetched", result[USERKEYS]);
      sendResponse(result[USERKEYS] || []);
    });
    return true; 
  }
});




