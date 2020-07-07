module.exports = {
  swagger: '2.0',
  swaggerDefinition: {
    info: {
      title: 'Swagger Test with Express',
      version: '1.0',
      description: 'Express with MongoDB(Mongoose)',
    },
    host: 'localhost:3000',
    basePath: '/',
    contact: {
      email: 'kyw017763@gmail.com',
    },
    components: {
      res: {
        INVALID_PARAM: {
          description: '잘못된 파라미터입니다!',
          schema: {
            $ref: '#/components/error/Error',
          },
        },
        INVALID_REQUEST: {
          description: '잘못된 요청입니다!',
          schema: {
            $ref: '#/components/error/Error',
          },
        },
        INTERVAL_ERROR: {
          description: '서버에서 오류가 발생했습니다!',
          schema: {
            $ref: '#/components/error/Error',
          },
        },
      },
      error: {
        Error: {
          type: 'object',
          properties: {
            errMsg: {
              type: 'string',
              description: 'Send Error Message',
            },
          },
        },
      },
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
