// Run the script : node script.js
// ----------- Script #1

// const axios = require("axios");

// const API_URL = "http://35.200.185.69:8000/v1/autocomplete";
// const API_KEY = "YOUR_API_KEY";

// async function fetchSuggestions() {
//   const prefixes = ["a", "b", "c", "d"];
//   const results = new Set();

//   for (const prefix of prefixes) {
//     try {
//       const response = await axios.get(API_URL, {
//         params: { query: prefix },
//         // headers: { Authorization: `Bearer ${API_KEY}` },
//       });

//       if (response.status === 200 && response.data.results) {
//         response.data.results.forEach((suggestion) => results.add(suggestion));
//       }
//     } catch (error) {
//       console.error(`Error fetching suggestions for prefix "${prefix}":`, error.message);
//     }
//   }

//   console.log("Extracted Names:", Array.from(results));
// }

// fetchSuggestions();


// ----------------- Script #2

const axios = require("axios");

// API configuration
const API_URL = "http://35.200.185.69:8000/v2/autocomplete"; // Replace with the actual API endpoint

// Initialize a counter for the number of requests made
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
      return response.data.results; // Expected API response: Array of suggestions
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Error querying prefix "${prefix}": ${error.message}`);
    return [];
  }
}

// Function to extract all possible names
async function extractAllNames() {
  const results = new Set(); // To store unique names
  const queue = [""]; // BFS queue; starts with an empty prefix

  while (queue.length > 0) {
    const prefix = queue.shift(); // Dequeue a prefix
    const suggestions = await queryAutocompleteAPI(prefix); // Query the API with the prefix

    suggestions.forEach((name) => {
      if (!results.has(name)) {
        results.add(name);

        // Add next-level prefixes to the queue
        // This assumes names are alphabetical, so explore deeper
        if (name.startsWith(prefix)) {
          queue.push(name);
        }
      }
    });

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

