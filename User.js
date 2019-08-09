const mongoose = require('mongoose');

let url = 'mongodb://localhost:27017/local';
let connection = mongoose.createConnection(url, function(err) {
  if(err){
    console.log("Connected failed");
  }
  console.log("Connected successfully to server");
});

const UserSchema = new mongoose.Schema({  
    name: String,
    email: String,
    password: String
});

module.exports = connection.model('users', UserSchema);