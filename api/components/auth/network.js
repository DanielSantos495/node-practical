const express = require('express');
const response = require('../../../network/response');
const controller = require('./index');
const router = express.Router();

const login = async (req, res) => {
   try {
      const token = await controller.login(req.body.username, req.body.password);
      response.success(req, res, token, 200);
   } catch(err) {
      response.error(req, res, 'Invalid data', 400, err);
   }
}

router.post('/login', login);

module.exports = router;