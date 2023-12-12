const express = require('express');

//const notes = require('express').Router();

const {v4:uuidv4} = require('uuid');

const notes = express();

const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');

 const port = process.env.port || 3001;

// get route for retrieving the notes from  the database    
notes.get('/', (req, res) => {
  console.log("Getting");
    readFromFile('./db/db.json').then((data) => 
    res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
  const {title, text} = req.body;

  if (title && text) {
    const newNotes = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNotes, "./db/db.json");

    const response = {
      status: "success",
      body: newNotes,
    };
    res.json(response);
  }
});

// create a new rout for delete notes
// it should receive a parameter, note id
// read the db.json file
// parse the db.json into notes json
// remove the given note id from the notes json
// write the file with remainig notes json

module.exports = notes;