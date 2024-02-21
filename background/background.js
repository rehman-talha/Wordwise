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

// Dictionary to store words and their definitions
const wordDictionary = {};

// Function to handle messages from content scripts and popups
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('Message received in background:', request);

  // Check if the message is for the double-click functionality
  if (request.action === 'getWordDefinition') {
    // Retrieve the definition of the requested word
    sendResponse({ definition: wordDictionary[request.word] });
  }

  // Check if the message is to add or update a word
  if (request.action === 'addOrUpdateWord') {
    // Add or update the word and its definition in the dictionary
    addOrUpdateWord(request.word, request.definition);

    // Save the updated words and their definitions to storage
    browser.storage.local.set({ wordwiseWords: wordDictionary });

    // Send a response if needed
    sendResponse({ message: 'Word added/updated successfully!' });
  }

  // Check if the message is to delete a word
  if (request.action === 'deleteWord') {
    // Delete the word and its definition
    deleteWord(request.word);

    // Save the updated words and their definitions to storage
    browser.storage.local.set({ wordwiseWords: wordDictionary });

    // Send a response if needed
    sendResponse({ message: 'Word deleted successfully!' });
  }

  // Check if the message is to import words
  if (request.action === 'importDictionary') {
    const importedWords = request.csvContent.split('\n').reduce((acc, line) => {
      const [word, definition] = line.split(',');
      if (word && definition) {
        acc[word.trim()] = definition.trim();
      }
      return acc;
    }, {});

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

  // Check if the message is to export the dictionary
  if (request.action === 'exportDictionary') {
    // Retrieve the current dictionary
    browser.storage.local.get('wordwiseWords', function(result) {
      const wordwiseWords = result.wordwiseWords || {};

      // Convert the dictionary to CSV format
      const csvContent = Object.entries(wordwiseWords)
        .map(([word, definition]) => `${word},${definition}`)
        .join('\n');

      // Trigger download of the CSV file
      browser.downloads.download({
        filename: 'wordwise_dictionary.csv',
        url: 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent),
        saveAs: true,
      });
    });
  }
});

// Function to add or update a word and its definition in the dictionary
function addOrUpdateWord(word, definition) {
  wordDictionary[word] = definition;
}

// Function to delete a word and its definition from the dictionary
function deleteWord(word) {
  delete wordDictionary[word];
}
