const express = require('express');
const bodyParser = require('body-parser');

// .env
require('dotenv').load();

// Database
const db = require('./config/db');

const app = express();

/* Middlewares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Modules */
require('./controllers/userController')(app);
require('./controllers/leadController')(app);

const port = 3000;
app.listen(port);

module.exports = app;
