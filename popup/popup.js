// popup/popup.js

document.addEventListener('DOMContentLoaded', function() {
  // Add event listener to handle export button click
  document.getElementById('exportButton').addEventListener('click', handleExport);

  // Add event listener to handle import button click
  document.getElementById('importButton').addEventListener('change', handleImport);

  // Add event listener to handle view words button click
  document.getElementById('viewWordsButton').addEventListener('click', handleViewWords);
});

// Function to handle export
function handleExport() {
  // ... (previous code)
}

// Function to handle import
function handleImport(event) {
  // ... (previous code)
}

// Function to handle view words
function handleViewWords() {
  // Send a message to the background script to view words
  browser.runtime.sendMessage({ action: 'viewWords' }, function(response) {
    const words = response.words || {};
    const wordsList = Object.entries(words).map(([word, definition]) => `${word}: ${definition}`);
    alert(wordsList.join('\n'));
  });
}
