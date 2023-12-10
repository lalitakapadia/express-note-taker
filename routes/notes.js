const express = requires('express');
const notes = require('notes');
const app = express();
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');

// get route for retrieving the notes from  the database    
app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => 
    res.json(json.parse(data)));
});