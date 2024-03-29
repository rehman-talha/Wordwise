// content/content.js

// Function to retrieve words and their meanings from the background script
function getWordDefinitions(word, callback) {
  browser.runtime.sendMessage({ action: 'getWordDefinition', word: word }, callback);
}

// Function to underline a word on the page with its definition
function underlineWord(word, definition) {
  // Adjust the line-height value based on your preference
  const lineHeightValue = '1.2';

  // Create a span element for the underlined words
  const span = document.createElement('span');
  span.style.textDecoration = 'underline';
  span.style.position = 'relative';
  span.style.lineHeight = lineHeightValue; // Set a smaller line height
  span.title = definition; // Tooltip with the definition
  span.textContent = word;

  // Create a range and surround the word with the span element
  const range = document.createRange();
  range.selectNodeContents(document.body);
  range.surroundContents(span);
}

// Function to handle double click on a word
function handleDoubleClick(event) {
  const selectedWord = window.getSelection().toString().trim();
  if (selectedWord) {
    // Send a message to the background script to handle the double click
    browser.runtime.sendMessage({ action: 'handleDoubleClick', word: selectedWord });
  }
}

// Function to add a new word and its definition to the local dictionary
function addWordToDictionary(word, definition) {
  browser.runtime.sendMessage({ action: 'addWordToDictionary', word: word, definition: definition });
}

// Function to remove a word from the local dictionary
function removeWordFromDictionary(word) {
  browser.runtime.sendMessage({ action: 'removeWordFromDictionary', word: word });
}

// Function to import words and definitions from a CSV file
function importDictionary(csvContent) {
  browser.runtime.sendMessage({ action: 'importDictionary', csvContent: csvContent });
}

// Function to export the local dictionary to a CSV file
function exportDictionary() {
  browser.runtime.sendMessage({ action: 'exportDictionary' });
}

// Function to process the text content of the webpage
function processPageContent() {
  // Get all text nodes on the page
  const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

  // Loop through each text node
  while (textNodes.nextNode()) {
    const textNode = textNodes.currentNode;

    // Split the text into words
    const words = textNode.nodeValue.trim().split(/\s+/);

    // Iterate through each word
    for (const word of words) {
      // Check if the word exists in your dictionary (words and their definitions)
      getWordDefinitions(word.toLowerCase(), function (definition) {
        if (definition) {
          // If the word has a definition, underline it on the page
          underlineWord(word, definition);
        }
      });
    }
  }
}

// Execute the content script logic when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  processPageContent();
});

// Add event listener for double click
document.addEventListener('dblclick', handleDoubleClick);
