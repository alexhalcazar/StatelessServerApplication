// Imports the file system module for interacting with files
const fs = require('fs');

// Takes in the search result and the result count
function saveSearchHistory(search, resultCount) {
  const filePath = './searchHistory.json';
  let history = [];

  // Checks if the file exists, and read its contents if it does
  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    history = JSON.parse(fileContents);
  }

  // Adds the new search and result count to the history array
  history.push({ search, resultCount });

  // Writes the updated history array to the file
  fs.writeFile(filePath, JSON.stringify(history), (err) => {
    if (err) throw err;
    console.log('Search history saved to file!');
  });
}

module.exports = { 
    saveSearchHistory 
};