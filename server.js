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
