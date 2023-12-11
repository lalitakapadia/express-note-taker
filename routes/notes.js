const express = require('express');

//const notes = require('express').Router();

const {v4:uuid} = require('uuid');

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
      id: uuid.v4(),
    };

    readAndAppend(newNotes, "./db/db.json");

    const response = {
      status: "success",
      body: newNotes,
    };
    res.json(response);
  }
});

module.exports = notes;