const express = require('express');
const app = express();
const UserController = require('./UserController');
app.use('/', UserController);

const port = 3000;

app.listen(port, function() {
    console.log('서버 가동 : ' + port);
});