# Autocomplete API Name Extractor 
This project demonstrates an efficient algorithm to query an autocomplete API recursively to extract all possible suggestions based on prefixes, while tracking the number of requests made. The algorithm is implemented in Node.js using the axios library.
## Features

- Fetches autocomplete suggestions using a Breadth-First Search (BFS) strategy
- Ensures unique results using a Set to store suggestions
- Tracks and logs the total number of API requests made during the process
- Handles API errors with descriptive logging.



## My Approach
**Prefix Exploration:**

- Start with an empty prefix "" in a queue

- Query the API for suggestions matching the prefix

- Add deeper prefixes to the queue for further exploration

**Unique Results:**

- Results are stored in a Set to ensure uniqueness.

**Logging:**

- Tracks processed prefixes, the number of suggestions found, and the total requests made.
## My Findings
Api Response Structure : SUCCESS
![api-response-structure](https://github.com/user-attachments/assets/b59b7a2f-0efe-4d93-acdd-12dd50352501)

Api Response Structure : MISSING QUERY
![image](https://github.com/user-attachments/assets/eebb9945-66cb-403e-956b-8440ada8b940)
