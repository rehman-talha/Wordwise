// background/background.js

// ... (previous code)

// Example: Listen for a message from the content script or popup
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('Message received in background:', request);

  // ... (previous code)

  // Check if the message is to get all words and definitions
  if (request.action === 'getAllWords') {
    browser.storage.local.get('wordwiseWords', function(result) {
      const wordwiseWords = result.wordwiseWords || {};
      sendResponse({ words: wordwiseWords });
    });
  }

  // Check if the message is to import words
  if (request.action === 'importWords') {
    const importedWords = request.words;

    // Merge imported words with existing words (if any)
    browser.storage.local.get('wordwiseWords', function(result) {
      const existingWords = result.wordwiseWords || {};
      const mergedWords = { ...existingWords, ...importedWords };

      // Save the merged words back to storage
      browser.storage.local.set({ wordwiseWords: mergedWords }, function() {
        sendResponse({ message: 'Words imported successfully!' });
      });
    });
  }

  // Check if the message is to view words
  if (request.action === 'viewWords') {
    browser.storage.local.get('wordwiseWords', function(result) {
      const wordwiseWords = result.wordwiseWords || {};
      sendResponse({ words: wordwiseWords });
    });
  }

  // Perform other background tasks as needed

  // Make sure to use return true to indicate an asynchronous response
  return true;
});
