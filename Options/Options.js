// options/options.js
document.addEventListener('DOMContentLoaded', function() {
  // Load saved options on page load
  loadOptions();

  // Add event listener to save options when the "Save Options" button is clicked
  document.getElementById('saveOptions').addEventListener('click', saveOptions);
});

// Function to load saved options
function loadOptions() {
  browser.storage.sync.get(['difficultyLevel', 'apiKey'], function(result) {
    // Set the selected difficulty level in the dropdown
    const difficultyLevel = result.difficultyLevel || '1';
    document.getElementById('difficultyLevel').value = difficultyLevel;

    // Set the saved API key in the input field
    const apiKey = result.apiKey || '';
    document.getElementById('apiKey').value = apiKey;
  });
}

// Function to save options
function saveOptions() {
  // Get the selected difficulty level
  const difficultyLevel = document.getElementById('difficultyLevel').value;

  // Get the entered API key
  const apiKey = document.getElementById('apiKey').value.trim();

  // Save the difficulty level and API key in Firefox storage
  browser.storage.sync.set({ difficultyLevel, apiKey }, function() {
    // Notify the user that options were saved
    alert('Options saved!');
  });
}
