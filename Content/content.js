// content/content.js

// Function to fetch the ChatGPT API key from extension options
async function getChatGPTApiKey() {
  return new Promise(resolve => {
    // Retrieve the API key from chrome.storage.sync
    chrome.storage.sync.get(['apiKey'], function(result) {
      const apiKey = result.apiKey || '';
      resolve(apiKey);
    });
  });
}

// ... (rest of the content.js code remains unchanged)

// Load difficult words when the content script is executed
loadDifficultWords();
