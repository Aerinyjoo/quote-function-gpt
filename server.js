const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

app.get('/quote', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    const quote = response.data[0];
    res.json({ quote: quote.q, author: quote.a });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

app.get('/.well-known/openapi.yaml', (req, res) => {
  res.sendFile(path.join(__dirname, '.well-known/openapi.yaml'));
});

app.get('/privacy', (req, res) => {
  res.send(`
    <html>
      <head><title>Privacy Policy</title></head>
      <body>
        <h1>Privacy Policy</h1>
        <p>This server does not store personal data.</p>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Quote server running on port 3000');
});
