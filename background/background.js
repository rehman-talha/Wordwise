// background/background.js

// Example: Log a message when the extension is installed
browser.runtime.onInstalled.addListener(function(details) {
  if (details.reason === 'install') {
    console.log('Extension installed!');
    // Initialize storage for words and their definitions
    browser.storage.local.set({ wordwiseWords: {} });
  } else if (details.reason === 'update') {
    console.log('Extension updated!');
  }
});

// Example: Listen for a message from the content script
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('Message received in background:', request);

  // Check if the message is to add a new word
  if (request.action === 'addWord') {
    // Retrieve existing words and their definitions from storage
    browser.storage.local.get('wordwiseWords', function(result) {
      const wordwiseWords = result.wordwiseWords || {};
      
      // Add the new word and its definition
      wordwiseWords[request.word] = request.definition;

      // Save the updated words and their definitions to storage
      browser.storage.local.set({ wordwiseWords: wordwiseWords });

      // Send a response if needed
      sendResponse({ message: 'Word added successfully!' });
    });
  }

  // Perform other background tasks as needed

  // Make sure to use return true to indicate an asynchronous response
  return true;
});
