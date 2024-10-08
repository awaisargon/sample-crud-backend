const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Car Management API',
      version: '1.0.0',
      description: 'API for managing cars and categories',
    },
    servers: [
      {
        url: 'http://localhost:8000/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        },
      },
    },
    security: [
      {
        bearerAuth: [], // This applies the bearer token globally
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;
