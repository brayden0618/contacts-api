const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const express = require('express');
require('dotenv').config();

const bodyParser = require('body-parser');

const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// routes FIRST
app.use('/', require('./routes'));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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