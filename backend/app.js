const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// A simple route
app.get('/', (req, res) => {
  res.send('Hello, Internal Knowledge Base!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
