interface Prompt {
    id: string;
    name: string;
    language: string;
    type: string;
    description: string;
    createdAt: string;
    updatedAt: string;
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
        const response = await fetch('http://localhost:8000/prompt', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        const data: any[] = await response.json();
    
        data.forEach((item) => {
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
                    textarea.value = item.name; // Update with data.title instead of prompt.name
                }
            });
    
            const description = document.createElement('p');
            description.innerText = item.name; // Update with data.body instead of prompt.description
            description.style.color = '#e0e0e0';
            description.style.margin = '0';
    
            promptBox.appendChild(description);
            promptContainer.appendChild(promptBox);
        });
    } catch (error) {
        console.error('Error fetching prompts:', error);
    }

    overlay.appendChild(promptContainer);
    document.body.appendChild(overlay);
}

addOverlay();
