// popup/doubleclick-popup.js

document.addEventListener('DOMContentLoaded', function () {
  const wordInput = document.getElementById('wordInput');
  const definitionInput = document.getElementById('definitionInput');
  const saveButton = document.getElementById('saveButton');
  const deleteButton = document.getElementById('deleteButton');

  // Get the word and its current definition from the background script
  browser.runtime.sendMessage({ action: 'getWordDefinition', word: wordInput.value }, function (definition) {
    definitionInput.value = definition || '';
  });

  // Handle Save button click
  saveButton.addEventListener('click', function () {
    const word = wordInput.value;
    const definition = definitionInput.value;

    // Send a message to the background script to add or update the word and definition
    browser.runtime.sendMessage({ action: 'addOrUpdateWord', word: word, definition: definition });

    // Close the popup
    window.close();
  });

  // Handle Delete button click
  deleteButton.addEventListener('click', function () {
    const word = wordInput.value;

    // Send a message to the background script to delete the word and its definition
    browser.runtime.sendMessage({ action: 'deleteWord', word: word });

    // Close the popup
    window.close();
  });
});
