const express = require('express');
const app = express();

const mongoose = require('mongoose');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world');
});

app.use('/cbm/user', require('./routes/user'));
app.use('/cbm/recipe', require('./routes/recipe'));

const PORT = 5000;

app.listen(PORT);
console.log(`CBM is running on http://localhost:${PORT}`);