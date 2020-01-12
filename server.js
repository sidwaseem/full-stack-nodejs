require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

mongoose.connect(process.env.DATABASE_URL, {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('connected to db'));
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

app.use(express.json());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '.')));
app.use('/', routes);
// setup port
const port = process.env.PORT || 5000;

// listen
app.listen(port);

console.log('App is listening on port ' + port);