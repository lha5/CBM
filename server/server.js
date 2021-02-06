const express = require('express');
const app = express();

require('dotenv').config();
const mongoose = require('mongoose');

app.use(express.json());

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log('MongoDB is connected...'))
  .catch(error => console.error('MongoDB connecting ERROR: ', error));

app.get('/', (req, res) => {
  res.send('Hello, world');
});

app.use('/cbm/user', require('./routes/user'));
app.use('/cbm/recipe', require('./routes/recipe'));
// error handler function
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

const PORT = 5000;

// app.listen(PORT);
// console.log(`CBM is running on http://localhost:${PORT}`);

module.exports = app;