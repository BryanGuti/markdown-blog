const express = require('express');
const app = express();

const PORT = 5050;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT);