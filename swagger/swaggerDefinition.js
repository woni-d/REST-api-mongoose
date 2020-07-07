module.exports = {
  swagger: '2.0',
  swaggerDefinition: {
    info: {
      title: 'Swagger Test with Express',
      version: '1.0',
      description: 'Express with MongoDB(Mongoose)',
    },
    host: 'localhost:3000/api-docs',
    basePath: '/',
    contact: {
      email: 'kyw017763@gmail.com',
    },
    schemes: ['http'],
    definitions: {
      'User': {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
      },
    },
  },
  apis: ['./swagger/user.js'],
}
