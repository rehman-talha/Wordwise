// content/content.js

// Function to fetch the user's selected difficulty level from extension options
function getUserDifficultyLevel() {
  // You need to implement logic to fetch the user's preferred difficulty level from extension options
  // For now, let's assume a default value of 1
  return 1;
}

// Function to fetch definitions using ChatGPT API
async function fetchDefinitionFromChatGPT(word) {
  // Replace 'YOUR_CHATGPT_API_KEY' with your actual ChatGPT API key
  const apiKey = 'YOUR_CHATGPT_API_KEY';
  const endpoint = 'https://api.openai.com/v1/chat/completions'; // Adjust the endpoint based on OpenAI's API documentation

  // You may need to format the input according to the ChatGPT API requirements
  const input = `Define the word "${word}"`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: input }
        ]
      })
    });

    const data = await response.json();
    // Extract and return the definition from the response
    return data.choices[0]?.message?.content || 'Definition not found';
  } catch (error) {
    console.error('Error fetching definition:', error.message);
    return 'Failed to fetch definition';
  }
}

// Function to load difficult words based on user's selected difficulty level
function loadDifficultWords() {
  const userDifficultyLevel = getUserDifficultyLevel();

  // Fetch the difficult words based on the user's difficulty level
  const difficultWords = getAllDifficultWords(userDifficultyLevel);

  // Process difficult words and fetch definitions
  difficultWords.forEach(async word => {
    const definition = await fetchDefinitionFromChatGPT(word);
    // Display or store the definition as needed
    console.log(`${word}: ${definition}`);
  });
}

// Function to get all difficult words based on user's difficulty level
function getAllDifficultWords(userDifficultyLevel) {
  // You need to implement logic to fetch words based on user's difficulty level
  // For now, let's assume a placeholder implementation
  const allWords = ['word1', 'word2', 'word3', 'word4', 'word5'];
  return allWords.slice(userDifficultyLevel - 1);
}

// Load difficult words when the content script is executed
loadDifficultWords();
