// Run the script using node script.js

const axios = require("axios");

// API Endpoint URL
const API_URL = "http://35.200.185.69:8000/v3/autocomplete";

// Counter for the number of requests
let requestCount = 0;

// Function to query the autocomplete API
async function queryAutocompleteAPI(prefix) {
  try {
    // Increment the request counter each time the API is called
    requestCount++;
    const response = await axios.get(API_URL, {
      params: { query: prefix },
    });

    if (response.status === 200 && response.data.results) {
      return response.data.results; // Expected API response (if successful): Array of suggestions
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Error querying prefix "${prefix}": ${error.message}`);
    return []; // Returns an empty array to prevent breaking the program
  }
}

// Function to extract all possible names
async function extractAllNames() {
  const results = new Set(); // To store unique names
  const queue = "abcdefghijklmnopqrstuvwxyz".split("");; // starts with all alphabets


  while (queue.length > 0) {
    const prefix = queue.shift(); // Dequeue a prefix
    const suggestions = await queryAutocompleteAPI(prefix); // Query the API with the prefix

    suggestions.forEach((name) => {
      if (!results.has(name)) {
        results.add(name);
      }
    });

    // Logs the number of suggestions retrieved for each prefix to track progress
    console.log(`Processed prefix "${prefix}": Found ${suggestions.length} suggestions`);
  }

  return Array.from(results); // Convert the Set to an Array
}

// Main function
(async () => {
  const allNames = await extractAllNames();
  console.log("All Extracted Names:", allNames);
  console.log("Total Number of Requests Made:", requestCount);
})();

