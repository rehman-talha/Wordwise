// background/background.js

// Example: Log a message when the extension is installed
browser.runtime.onInstalled.addListener(function(details) {
  if (details.reason === 'install') {
    console.log('Extension installed!');
  } else if (details.reason === 'update') {
    console.log('Extension updated!');
  }
});

// Example: Listen for a message from the content script
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('Message received in background:', request);
  
  // Example: Check if the request is for definition retrieval
  if (request.action === 'getDefinition') {
    // Replace this with your logic to fetch the definition
    const definition = getWordDefinition(request.word);

    // Send the definition back to the content script
    sendResponse({ definition });
  } else {
    // Perform other background tasks or send a response if needed
    sendResponse({ message: 'Background script received your message!' });
  }
});

// Function to fetch the definition of a word (replace this with your logic)
function getWordDefinition(word) {
  // Replace this with your logic to fetch the definition
  // For now, return a placeholder definition
  return 'Definition of ' + word;
}
