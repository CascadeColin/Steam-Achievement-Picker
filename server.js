const express = require('express');
const app = express();
// sets PORT for Heroku, or 3001 if developing on localhost
const PORT = process.env.PORT || 3002;
const routes = require('./routes');
const path = require('path');

// built-in JSON parser
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// use public folder to render front end code
app.use(express.static(path.join(__dirname, 'public')));

// tells express to use imported routers
app.use(routes);

app.listen(PORT, () => console.log(`Hosted on port ${PORT}`));