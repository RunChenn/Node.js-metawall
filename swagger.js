const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Mets API',
    description: '示範生成文件',
  },
  host: 'localhost:3005',
  schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const endpointFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointFiles, doc);
