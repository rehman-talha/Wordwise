// options/options.js
document.addEventListener('DOMContentLoaded', function() {
  // Add event listener to handle double-click and show the modal window 
  document.addEventListener('dblclick', showDoubleClickModal);

  // Add event listener to save meaning when the "Save Meaning" button is clicked
  document.getElementById('saveMeaning').addEventListener('click', saveMeaning);

  // Add event listener to close the modal when the "Close" button is clicked
  document.getElementById('closeModal').addEventListener('click', hideDoubleClickModal);

  // Add event listener to handle import button click
  document.getElementById('importButton').addEventListener('change', handleImport);

  // Add event listener to handle export button click
  document.getElementById('exportButton').addEventListener('click', handleExport);
});

// Function to handle import
function handleImport(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const csvData = e.target.result;
      const importedData = parseCSV(csvData);

      // Merge imported data with existing data (if any)
      browser.storage.local.get('wordMeanings', function(result) {
        const existingData = result.wordMeanings || {};
        const mergedData = { ...existingData, ...importedData };

        // Save the merged data back to storage
        browser.storage.local.set({ wordMeanings: mergedData }, function() {
          alert('Data imported successfully!');
        });
      });
    };

    reader.readAsText(file);
  }
}

// Function to handle export
function handleExport() {
  // Retrieve word meanings from storage
  browser.storage.local.get('wordMeanings', function(result) {
    const wordMeanings = result.wordMeanings || {};

    // Convert word meanings to CSV format
    const csvData = convertToCSV(wordMeanings);

    // Create a Blob and initiate a download
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = 'word_meanings.csv';

    // Trigger a click to start the download
    link.click();
  });
}

// Function to parse CSV data into an object
function parseCSV(csvData) {
  const lines = csvData.split('\n');
  const result = {};

  for (const line of lines) {
    const [word, definition] = line.split(',');
    result[word.trim()] = definition.trim();
  }

  return result;
}

// Function to convert an object to CSV format
function convertToCSV(data) {
  const lines = [];

  for (const [word, definition] of Object.entries(data)) {
    lines.push(`${word},${definition}`);
  }

  return lines.join('\n');
}

// Function to show the double-click modal window
function showDoubleClickModal(event) {
  const selectedWord = window.getSelection().toString().trim();
  if (selectedWord) {
    document.getElementById('word').value = selectedWord;
    document.getElementById('meaning').value = ''; // Clear previous meaning
    document.getElementById('doubleClickModal').style.display = 'block';
  }
}

// Function to save meaning
function saveMeaning() {
  const word = document.getElementById('word').value;
  const meaning = document.getElementById('meaning').value;

  // Retrieve existing word meanings from storage
  browser.storage.local.get('wordMeanings', function(result) {
    const wordMeanings = result.wordMeanings || {};

    // Save the new or updated meaning
    wordMeanings[word.toLowerCase()] = meaning;

    // Save the updated word meanings back to storage
    browser.storage.local.set({ wordMeanings }, function() {
      // Notify the user that the meaning was saved
      alert(`Meaning for '${word}' saved: ${meaning}`);

      // Close the modal window
      hideDoubleClickModal();
    });
  });
}

// Function to hide the double-click modal window
function hideDoubleClickModal() {
  document.getElementById('doubleClickModal').style.display = 'none';
}
