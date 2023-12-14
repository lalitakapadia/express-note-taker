const express = require ('express');

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

const api = require('./routes/index');

// Specify on which port the Express.js server will run
const port = process.env.PORT || 3002;

const app = express();
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for static index page
app.get('/', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for static notes page
app.get('/', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(port, () => 
    console.log(`app listening at http://localhost:${port}.`)
);
