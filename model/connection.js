const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/mongodbtest';
const connection = mongoose.connect(url, (err) => {
  if (err) {
    console.log("Connected failed");
  } else {
    console.log("Connected successfully to server");
  }
});

module.exports = connection;
