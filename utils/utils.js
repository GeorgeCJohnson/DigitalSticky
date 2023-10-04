const fs = require("fs");
const { resolve } = require("path");

// Promisify the fs.readFile method
const readFileAsync = (filePath, encoding) => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) throw err;
        console.log(data);
      }); 
}

// Promisify the fs.writeFile method
const writeFileAsync = (filePath, data, encoding) => {
    fs.writeFile(filePath, data, encoding, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      }); 
}

module.exports = {readFileAsync, writeFileAsync};

