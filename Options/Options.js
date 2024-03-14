// options/options.js

document.addEventListener('DOMContentLoaded', function() {
  // Add event listeners
  document.addEventListener('dblclick', showDoubleClickModal);
  document.getElementById('saveMeaning').addEventListener('click', saveMeaning);
  document.getElementById('closeModal').addEventListener('click', hideDoubleClickModal);
  document.getElementById('importButton').addEventListener('change', handleImport);
  document.getElementById('exportButton').addEventListener('click', handleExport);
});

// Function to handle import
async function handleImport(event) {
  try {
    const fileInput = event.target;
    const file = fileInput.files[0];
    
    if (!file) return;

    const csvData = await readFileAsText(file);
    const importedData = parseCSV(csvData);

    const existingData = await browser.storage.local.get('wordMeanings');
    const mergedData = { ...existingData.wordMeanings, ...importedData };

    await browser.storage.local.set({ wordMeanings: mergedData });
    alert('Data imported successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
    alert('Error importing data. Please try again.');
  }
}

// Function to handle export
async function handleExport() {
  try {
    const { wordMeanings } = await browser.storage.local.get('wordMeanings');
    const csvData = convertToCSV(wordMeanings);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'word_meanings.csv';
    link.click();
  } catch (error) {
    console.error('Error exporting data:', error);
    alert('Error exporting data. Please try again.');
  }
}

// Utility function to read file as text
function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsText(file);
  });
}

// Other functions remain unchanged...
