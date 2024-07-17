// Function to open a new tab with a specified URL
function toUrl(url: string) { 
    chrome.tabs.create({ url });
}

// Listen for a click on the extension icon
chrome.action.onClicked.addListener((tab) => {
    // Call the toUrl function with the desired URL
    toUrl('https://www.facebook.com');
});