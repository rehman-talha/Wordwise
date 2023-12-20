// popup.js

function handleImport(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];

  if (file) {
    // Read the file content
    const reader = new FileReader();
    reader.onload = function (e) {
      const csvContent = e.target.result;
      // Perform the import logic with the CSV content
      const lines = csvContent.split('\n');
      const importedWords = {};

      lines.forEach(line => {
        const [word, definition] = line.split(',');
        importedWords[word.trim()] = definition.trim();
      });

      // Send a message to the background script to import the words
      browser.runtime.sendMessage({ action: 'importWords', words: importedWords })
        .then(response => {
          console.log(response.message);
        })
        .catch(error => {
          console.error('Error importing words:', error);
        });
    };
    reader.readAsText(file);
  }
}

function handleExport() {
  // Send a message to the background script to get all words
  browser.runtime.sendMessage({ action: 'getAllWords' })
    .then(response => {
      const wordwiseWords = response.words;

      // Convert wordwiseWords to CSV format
      const csvContent = Object.entries(wordwiseWords)
        .map(([word, definition]) => `${word},${definition}`)
        .join('\n');

      // Create a Blob with the CSV content
      const blob = new Blob([csvContent], { type: 'text/csv' });

      // Create a download link and trigger the download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'wordwise_export.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(error => {
      console.error('Error exporting words:', error);
    });
}

function handleViewWords() {
  // Send a message to the background script to view saved words
  browser.runtime.sendMessage({ action: 'viewWords' })
    .then(response => {
      const wordwiseWords = response.words;
      console.log('Viewing Words:', wordwiseWords);

      // Display words in the popup
      const wordsContainer = document.getElementById('words-container');
      wordsContainer.innerHTML = '';

      for (const [word, definition] of Object.entries(wordwiseWords)) {
        const wordElement = document.createElement('div');
        wordElement.textContent = `${word}: ${definition}`;
        wordsContainer.appendChild(wordElement);
      }
    })
    .catch(error => {
      console.error('Error viewing words:', error);
    });
}

// ... (additional code for handling double click functionality, if needed)
