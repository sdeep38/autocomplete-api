// Run the script using node script.js

const axios = require("axios");

// API Endpoint URL
const API_URL = "http://35.200.185.69:8000/v2/autocomplete";

// Counter for the number of requests
let requestCount = 0;

// Helper function to add delay (rate-limiting)
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to query the autocomplete API with rate-limiting
async function queryAutocompleteAPI(prefix, delayInMs) {
  try {
    // Add delay to enforce rate-limiting
    if (delayInMs) await delay(delayInMs);

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
async function extractAllNames(rateLimitInMs = 500) {
  const results = new Set(); // To store unique names
  const queue = "abcdefghijklmnopqrstuvwxyz0123456789".split("");; // starts with all alphabets


  while (queue.length > 0) {
    const prefix = queue.shift(); // Dequeue a prefix
    const suggestions = await queryAutocompleteAPI(prefix, rateLimitInMs); // Query the API with the prefix and with delay

    suggestions.forEach((name) => {
      if (!results.has(name)) {
        results.add(name);

        // Add next-level prefixes to the queue
        if (name.startsWith(prefix)) {
          queue.push(name);
        }

      }
    });

    // Logs the number of suggestions retrieved for each prefix to track progress
    console.log(`Processed prefix "${prefix}": Found ${suggestions.length} suggestions`);
  }

  return Array.from(results); // Convert the Set to an Array
}

// Main function
(async () => {
  const rateLimitInMs = 1500; // Adjust rate limit in milliseconds
  const allNames = await extractAllNames(rateLimitInMs);
  console.log("Total suggestions:", allNames.length);
  console.log("Total Number of Requests Made:", requestCount);
})();

