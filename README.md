# autocomplete-api
This project demonstrates an efficient algorithm to query an autocomplete API recursively to extract all possible suggestions based on prefixes, while tracking the number of requests made. The algorithm is implemented in Node.js using the axios library.

Features
Fetches autocomplete suggestions using a Breadth-First Search (BFS) strategy.

Ensures unique results using a Set to store suggestions.

Tracks and logs the total number of API requests made during the process.

Handles potential API errors with descriptive logging.

My Approach
Prefix Exploration:

Starts with an empty prefix "" in a queue.

Queries the API for suggestions matching the prefix.

Adds deeper prefixes to the queue for further exploration.

Unique Suggestions:

Results are stored in a Set to prevent duplicates.

Logging:

Tracks processed prefixes, the number of suggestions found, and the total requests made.