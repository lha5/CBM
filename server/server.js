const express = require('express');

const PORT = 5000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world');
});

app.listen(PORT);
console.log(`CBM is running on http://localhost:${PORT}`);