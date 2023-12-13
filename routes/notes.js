
// Import Express.js
const express = require('express');

// unique id for notes 
const {v4:uuidv4} = require('uuid');

// Initialize an instance of Express.js
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
// POST request for new notes from the database 
notes.post('/', (req, res) => {
  
  // Destructuring assignment for the items in req.body
  const {title, text} = req.body;

    // If all the required properties are present
  if (title && text) {
     // Variable for the object we will save
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

// DELETE Route for a specific note
const fs = require('fs');
const path = require('path');

notes.delete('/:id', (req, res) => {
  // Get the note ID from the request parameters
  const noteId = req.params.id;

  // Read the contents of the db.json file
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Parse the JSON data into an array of notes
    let notes = JSON.parse(data);

    // Find the index of the note with the matching ID
    const noteIndex = notes.findIndex(note => note.id === noteId);

    // If the note is found, remove it from the array
    if (noteIndex !== -1) {
      notes.splice(noteIndex, 1);

      // Write the updated notes array back to the db.json file
      fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
        if (err) {
          console.error(err);
          // the purpose of the if statement is to allow a way to throw an error when something goes wrong
          return res.status(500).json({ error: 'Internal server error' });
        }

        // Return a success response
        res.json({ message: 'Note deleted successfully' });
      });
    } else {
      // If the note is not found, return a not found response
      res.status(404).json({ error: 'Note not found' });
    }
  });
});


module.exports = notes;