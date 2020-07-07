const express = require('express');
const bodyParser = require('body-parser');
const User = require('./router/user');
const SwaggerUser = require('./swagger/user');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerOption = require('./swagger/swaggerDefinition');
const swaggerSpec = swaggerJSDoc(swaggerOption);

require('./model/connection');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec));

app.use('/api-docs/users', SwaggerUser);
app.use('/users', User);

const port = 3000;

app.listen(port, function() {
    console.log('Server is running : ' + port);
});
