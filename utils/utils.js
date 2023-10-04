const fs = require("fs");

// Promisify the fs.readFile method
const readFileAsync = (filePath, encoding) => {
  return new Promise ((resolve, reject) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Promisify the fs.writeFile method
const writeFileAsync = (filePath, data) => {
  return new Promise ((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
        console.log("The file has been saved!");
    }); 
  });
}  

module.exports = {readFileAsync, writeFileAsync};

