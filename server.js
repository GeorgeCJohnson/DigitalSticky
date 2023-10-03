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

//Routes | Delete requests
app.delete(`./routes/api-routes.js/:id`, (req, res) => {
  const idToDelete = parseInt(req.params.id);

  readFileAsync(`./db/db.json`, `utf8`).then((data) => {
    const notes = [].concat(JSON.parse(data));
    const newNotesData = [];

    for (let i = 0; i < notes.length; i++) {
      if (idToDelete !== notes[i].id) {
        newNotesData.push(notes[i]);
      }
    }

    writeFileAsync(`./db/db.json`, JSON.stringify(newNotesData)).then(() => {
      console.log(`Note deleted!`);
    });
  });

  res.send(`Note deleted!`);
});

// HTML Routes
app.get(`.notes`, (req, res) => {
  res.sendFile(path.join(__dirname, `./public/notes.html`));
});

app.get(`*`, (req, res) => {
  res.sendFile(path.join(__dirname, `./public/index.html`));
});

app.get(`/`) => {
    res.sendFile(path.join(__dirname, `./public/index.html`));
    };

//Start Server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
