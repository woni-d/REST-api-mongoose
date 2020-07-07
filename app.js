const express = require('express');
const User = require('./router/user');

require('./model/connection');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use('/users', User);

const port = 3000;

app.listen(port, function() {
    console.log('서버 가동 : ' + port);
});
