const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

// setup app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Add Routes middleware
app.use(routes);
app.use(express.json());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '.')));

// setup port
const port = process.env.PORT || 5000;

// listen
app.listen(port);

console.log('App is listening on port ' + port);