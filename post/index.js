const express = require('express');
const { post } = require('../config');
const posts = require('./components/post/network');
const errors = require('../network/errors');

const app = express();

app.use(express.json());

app.use('/api/post', posts);

app.use(errors);

app.listen(post.port, error => {
   if (error) {
      console.log('Error starting the server');
   }
   console.log(`Starting server posts in http://localhost:${post.port}`);
});