const express = require('express');
const { api } = require('../config');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');
const errors = require('../network/errors');

const app = express();

app.use(express.json())
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errors);

app.listen(api.port, error => {
   if (error) {
      console.log('Error starting the server');
   }
   console.log('Starting server in http://localhost:3000');
});