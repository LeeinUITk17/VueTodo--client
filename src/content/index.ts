document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; 
    overlay.style.zIndex = '1000'; 
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.color = 'white';
    overlay.style.fontSize = '24px';
    overlay.textContent = 'Overlay Content';
  
    document.body.appendChild(overlay);
  
    
    chrome.runtime.sendMessage({ greeting: 'hello from content script' }, (response: any) => {
      console.log('Received response:', response);
    });
  });

  chrome.runtime.onMessage.addListener(
    (message: { greeting: string }, sender: any, sendResponse: (response: { farewell: string }) => void) => {
      if (message.greeting === 'hello from background') {
        console.log('Received message in content script:', message);
        sendResponse({ farewell: 'goodbye from content script' });
      }
      return true;
    }
  );
  