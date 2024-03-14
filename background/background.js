// background/background.js

// Initialize storage for words and their definitions
browser.runtime.onInstalled.addListener(function(details) {
  if (details.reason === 'install') {
    console.log('Extension installed!');
    initializeWordDictionary();
  } else if (details.reason === 'update') {
    console.log('Extension updated!');
  }
});

// Dictionary to store words and their definitions
let wordDictionary = {};

// Function to initialize word dictionary
function initializeWordDictionary() {
  browser.storage.local.set({ wordwiseWords: {} });
}

// Function to handle messages from content scripts and popups
browser.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  console.log('Message received in background:', request);

  try {
    switch (request.action) {
      case 'getWordDefinition':
        sendResponse({ definition: wordDictionary[request.word] });
        break;
      case 'addOrUpdateWord':
        addOrUpdateWord(request.word, request.definition);
        await saveWordDictionaryToStorage();
        sendResponse({ message: 'Word added/updated successfully!' });
        break;
      case 'deleteWord':
        deleteWord(request.word);
        await saveWordDictionaryToStorage();
        sendResponse({ message: 'Word deleted successfully!' });
        break;
      case 'importDictionary':
        await importDictionary(request.csvContent);
        sendResponse({ message: 'Words imported successfully!' });
        break;
      case 'exportDictionary':
        await exportDictionary();
        sendResponse({ message: 'Dictionary exported successfully!' });
        break;
      default:
        sendResponse({ error: 'Unknown action' });
    }
  } catch (error) {
    console.error('Error:', error);
    sendResponse({ error: error.message });
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

// Function to save word dictionary to storage
async function saveWordDictionaryToStorage() {
  await browser.storage.local.set({ wordwiseWords: wordDictionary });
}

// Function to import words into the dictionary
async function importDictionary(csvContent) {
  const importedWords = csvContent.split('\n').reduce((acc, line) => {
    const [word, definition] = line.split(',');
    if (word && definition) {
      acc[word.trim()] = definition.trim();
    }
    return acc;
  }, {});
  wordDictionary = { ...wordDictionary, ...importedWords };
  await saveWordDictionaryToStorage();
}

// Function to export dictionary to CSV
async function exportDictionary() {
  const wordwiseWords = await browser.storage.local.get('wordwiseWords');
  const dictionary = wordwiseWords.wordwiseWords || {};
  const csvContent = Object.entries(dictionary)
    .map(([word, definition]) => `${word},${definition}`)
    .join('\n');
  await browser.downloads.download({
    filename: 'wordwise_dictionary.csv',
    url: 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent),
    saveAs: true,
  });
}
