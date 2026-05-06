const express = require('express');
require('dotenv').config();

const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// routes FIRST
app.use('/', require('./routes'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});