const express = require('express');
const checkAuth = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');
const router = express.Router();

const list = async (req, res, next) => {
   try {
      const list = await controller.list()
      response.success(req, res, list, 200)
   } catch(err) {
      next(err)
   }
}

const get = async (req, res, next) => {
   try {
      const user = await controller.get(req.params.id);
      response.success(req, res, user, 200);
   } catch(err) {
      next(err)
   }
}

const upsert = async (req, res, next) => {
   const { body } = req;
   // controller.insert(body)
   //    .then(() => {
   //       response.success(req, res, 'Created user', 201);
   //    })
   //    .catch(next)
   try {
      const user = await controller.insert(body);
      response.success(req, res, user, 201);
   } catch(err) {
      next(err)
   }
}

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', checkAuth('update'), upsert);



module.exports = router;
