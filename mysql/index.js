const express = require('express');
const { mysqlService } = require('../config')
const mysql = require('./network');

const app = express();

app.use(express.json());

// Routes
app.use('/', mysql)

app.listen(mysqlService.port, error => {
   if(error) {
      console.error('Error starting the server');
   }
   console.log(`Mysql service watching in: ${mysqlService.port}`)
});