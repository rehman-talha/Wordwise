// content/content.js

// Function to check if a word is difficult (replace this with your logic)
function isWordDifficult(word) {
  // Replace this with your logic to determine word difficulty
  // For now, consider every word as difficult
  return true;
}

// Function to send a message to the background script to get the definition
function getDefinitionFromBackground(word) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: 'getDefinition', word }, function(response) {
      resolve(response.definition);
    });
  });
}

// Function to load definitions for difficult words
async function loadDefinitions() {
  // Example: Get all paragraphs on the page
  const paragraphs = document.querySelectorAll('p');

  // Example: Loop through paragraphs
  for (const paragraph of paragraphs) {
    const words = paragraph.textContent.split(' ');

    // Loop through words in the paragraph
    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      // Check if the word is difficult
      if (isWordDifficult(word)) {
        // Get the definition from the background script
        const definition = await getDefinitionFromBackground(word);

        // Add the definition as a tooltip or display it on top of the word
        const span = document.createElement('span');
        span.textContent = ` (${definition}) `;
        span.style.fontSize = 'small'; // Adjust the font size as needed

        // Replace the word with the word and its definition
        words[i] = word + span.outerHTML;
      }
    }

    // Update the paragraph content with modified words
    paragraph.innerHTML = words.join(' ');
  }
}

// Load definitions when the content script is executed
loadDefinitions();
