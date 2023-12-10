const express = require ('express');
const path = require('path');
const api = require('./routes/index.js');

const port = precess.env.port || 3001;

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
app.listen(port, () => 
    console.log(`app listening at http://localhost:${port}.`)
);
