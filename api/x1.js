const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// This route is intentionally vulnerable to XSS for educational purposes
app.get('/api/search', (req, res) => {
  const query = req.query.query;  // Get 'query' parameter from the request URL
  // Intentionally vulnerable: Injecting raw user input into HTML without sanitization
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Search Result</title>
    </head>
    <body>
      <h1>Search Result:</h1>
      <p>You searched for: ${query}</p> <!-- Unsafe: Injecting raw query -->
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
