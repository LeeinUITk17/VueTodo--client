interface Prompts {
    id: string;
    name: string;
    language: string;
    type: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }
  interface User {
    email: string;
    id: string;
  }
  
  const STORAGEKEYS = "Prompt";

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Content script received message:', message);
    if (message.action === 'fillPrompt') {
      const textarea = document.querySelector('textarea');
      if (textarea) {
        console.log('Found textarea, updating with prompt:', message.prompt);
        textarea.value = message.prompt;
        const inputEvent = new Event('input', { bubbles: true });
        textarea.dispatchEvent(inputEvent);
      } else {
        console.error('Textarea not found');
      }
    } else {
      console.error('Unknown action:', message.action);
    }
  });

  
  async function saveManager(prompt: Prompts) {
    return new Promise<void>((resolve, reject) => {
      chrome.runtime.sendMessage({ action: "savePrompt", data: prompt }, (response) => {
        if (response.status === "success") {
          resolve();
        } else {
          reject(new Error("Failed to save prompt"));
        }
      });
    });
  }
  
  async function getManager(): Promise<Prompts[]> {
    return new Promise<Prompts[]>((resolve) => {
      chrome.runtime.sendMessage({ action: "getPrompts" }, (response) => {
        resolve(response);
      });
    });
  }
  
  async function getManagerUser(): Promise<User> {
    return new Promise<User>((resolve) => {
      chrome.runtime.sendMessage({ action: "getuser" }, (response) => {
        resolve(response);
      });
    });
  }
  
  async function addOverlay(): Promise<void> {
  const overlay = document.createElement('div');
  overlay.id = 'chatgpt-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '10px';
  overlay.style.right = '10px';
  overlay.style.width = '320px';
  overlay.style.height = '500px';
  overlay.style.backgroundColor = '#2e2e2e';
  overlay.style.zIndex = '1000';
  overlay.style.border = '1px solid #444';
  overlay.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.2)';
  overlay.style.padding = '10px';
  overlay.style.overflowY = 'auto';
  overlay.style.borderRadius = '8px';
  overlay.style.fontFamily = 'Arial, sans-serif';

  const title = document.createElement('h2');
  title.innerText = 'ChatGPT Prompt Helper';
  title.style.color = '#e0e0e0';
  title.style.fontSize = '18px';
  overlay.appendChild(title);

  const promptContainer = document.createElement('div');
  promptContainer.style.display = 'flex';
  promptContainer.style.flexDirection = 'column';
  promptContainer.style.gap = '10px';

  try {
    const prompts = await getManager();

    prompts.forEach((prompt) => {
      const promptBox = document.createElement('div');
      promptBox.style.backgroundColor = '#3b3b3b';
      promptBox.style.border = '1px solid #555';
      promptBox.style.borderRadius = '8px';
      promptBox.style.padding = '10px';
      promptBox.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
      promptBox.style.cursor = 'pointer';
      promptBox.style.transition = 'background-color 0.3s';

      promptBox.addEventListener('click', () => {
        const textarea = document.querySelector('textarea') as HTMLTextAreaElement | null;
        if (textarea !== null) {
          textarea.value = prompt.description;
        }
        overlay.style.display = 'none';
        promptButton.style.display = 'block';
      });

      const name = document.createElement('p');
      name.innerText = prompt.name;
      name.style.color = '#e0e0e0';
      name.style.margin = '0';

      promptBox.appendChild(name);
      promptContainer.appendChild(promptBox);
    });
  } catch (error) {
    console.error('Error fetching prompts:', error);
  }

  overlay.appendChild(promptContainer);
  document.body.appendChild(overlay);

  const promptButton = document.createElement('button');
  promptButton.innerText = 'Prompt';
  promptButton.style.position = 'fixed';
  promptButton.style.backgroundColor = '#3b3b3b';
  promptButton.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
  promptButton.style.top = '50px';
  promptButton.style.right = '10px';
  promptButton.style.zIndex = '1001';
  promptButton.style.display = 'none';
  promptButton.style.color = '#e0e0e0';
  promptButton.style.borderRadius = '8px';
  document.body.appendChild(promptButton);

  promptButton.addEventListener('click', () => {
    overlay.style.display = 'block';
    promptButton.style.display = 'none';
  });
}

addOverlay();

// async function checkUserAuthenticated() {
//     const user = await getManagerUser();
//     if (user) {
//       addOverlay();
//     }
//   }

//   checkUserAuthenticated();

