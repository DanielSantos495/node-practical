const express = require('express');
const { cacheService } = require('../config')
const cache = require('./network');

const app = express();

app.use(express.json());

// Routes
app.use('/', cache)

app.listen(cacheService.port, error => {
   if(error) {
      console.error('Error starting the server');
   }
   console.log(`Redis Cache service watching in: ${cacheService.port}`)
})