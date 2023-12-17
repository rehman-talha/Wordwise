// popup/popup.js

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('exportWords').addEventListener('click', exportWords);
  document.getElementById('importWords').addEventListener('change', handleImport);
  document.getElementById('viewWords').addEventListener('click', viewWords);
});

function exportWords() {
  // Implement logic to export the list of words
  console.log('Export Words clicked!');
}

function handleImport(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const csvData = e.target.result;
      // Implement logic to handle the imported data
      console.log('Imported data:', csvData);
    };

    reader.readAsText(file);
  }
}

function viewWords() {
  // Implement logic to open a larger window for viewing the list of words
  console.log('View Words clicked!');
}
