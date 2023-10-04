// Import Modules
const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Get all notes
router.get('/notes', (req, res) => {
    // Read the db.json file and return all saved notes as JSON
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

//Post Route

router.post('/notes', (req, res) => {
    // Receives a new note, adds it to db.json, then returns the new note
    const newNote = req.body;
    newNote.id = uuidv4();
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});

// Delete Route

router.delete('/notes/:id', (req, res) => {
    // Receives a query parameter containing the id of a note to delete
    // Reads all notes from the db.json file
    // Removes the note with the given id property
    // Rewrite the notes to the db.json file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const newNotes = notes.filter((note) => note.id !== req.params.id);
        fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err) => {
            if (err) throw err;
            res.json(newNotes);
        });
    });
});

module.exports = router;