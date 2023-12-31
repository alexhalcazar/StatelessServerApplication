const express = require('express');

const app = express();
const port = 4000;

// want to require in our database functionality when our server starts
const mongo = require('./db');

// require in the exported routers
const search = require('./routes/search.js');

const history = require('./routes/history.js');

// add routes to our express application
app.use('/search', search);

app.use('/history', history);

// start the server
app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
    await mongo.connect();
});
