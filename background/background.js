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

  // Perform background tasks or send a response if needed
  sendResponse({ message: 'Background script received your message!' });
});
