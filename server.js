//Dependencies

const express = require(`express`);
const path = require(`path`);
const fs = require(`fs`);
const utils = require(`./utils`);

// Asynchronous Processes

const readFileAsync = utils.promisify(fs.readFile);
const writeFileAsync = utils.promisify(fs.writeFile);

//Set up Server

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Middleware

app.use(express.static("public"));

//Routes | Get requests
app.get(`./routes/api-routes.js`, (req, res) => {
  readFileAsync(`./db/db.json`, `utf8`).then((data) => {
    notes = [].concat(JSON.parse(data));
    res.json(notes);
  });
});

//Routes | Post requests
app.post(`./routes/api-routes.js`, (req, res) => {
  const note = req.body;

  readFileAsync(`./db/db.json`, `utf8`).then((data) => {
    const notes = [].concat(JSON.parse(data));
    note.id = notes.length + 1;
    notes.push(note);
    return notes;
  });

  writeFileAsync(`./db/db.json`, JSON.stringify(notes)).then(() => {
    console.log(`Note added!`)
  });

  res.json(note);
});
