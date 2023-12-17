// content/content.js

// Example: Log a message when the content script is executed
console.log('Content script is running!');

// Example: Send a message to the background script
chrome.runtime.sendMessage({ message: 'Hello from content script!' }, function(response) {
  console.log('Response from background script:', response.message);
});

// Example: Manipulate the DOM (replace all paragraphs with a message)
document.querySelectorAll('p').forEach(function(paragraph) {
  paragraph.textContent = 'This paragraph has been replaced by the content script!';
});
