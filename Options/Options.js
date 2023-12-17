// options/options.js
document.addEventListener('DOMContentLoaded', function() {
  // Add event listener to handle double-click and show the modal window
  document.addEventListener('dblclick', showDoubleClickModal);

  // Add event listener to save meaning when the "Save Meaning" button is clicked
  document.getElementById('saveMeaning').addEventListener('click', saveMeaning);

  // Add event listener to close the modal when the "Close" button is clicked
  document.getElementById('closeModal').addEventListener('click', hideDoubleClickModal);
});

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

  // Save the word and its meaning (implement your storage logic here)

  // Notify the user that the meaning was saved
  alert(`Meaning for '${word}' saved: ${meaning}`);

  // Close the modal window
  hideDoubleClickModal();
}

// Function to hide the double-click modal window
function hideDoubleClickModal() {
  document.getElementById('doubleClickModal').style.display = 'none';
}
