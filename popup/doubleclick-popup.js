<!-- popup/popup.html -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wordwise Popup</title>
  <style>
    body {
      font-family: Arial, sans-serif;
    }

    h2 {
      color: #333;
    }

    label {
      display: block;
      margin-top: 10px;
      color: #555;
    }

    input, textarea {
      width: 100%;
      box-sizing: border-box;
      margin-top: 5px;
    }

    button {
      margin-top: 10px;
      padding: 8px 12px;
      background-color: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>
  <h2>Wordwise Popup</h2>

  <label for="wordInput">Word:</label>
  <input type="text" id="wordInput" readonly>

  <label for="definitionInput">Definition:</label>
  <textarea id="definitionInput" rows="4"></textarea>

  <button id="saveButton">Save</button>
  <button id="deleteButton">Delete</button>

  <script src="doubleclick-popup.js"></script>
</body>
</html> 

