const express = require('express');
const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');
const router = express.Router();

const list = async (req, res, next) => {
   try {
      const list = await controller.list();
      response.success(req, res, list, 200);
   } catch(error) {
      next(error);
   }
}

const get = async (req, res, next) => {
   const { params } = req;
   try {
      const post = await controller.get(params.id);
      response.success(req, res, post, 200);
   } catch(error) {
      next(error);
   }
}

const upsert = async (req, res, next) => {
   const { body } = req;
   try {
      controller.upsert(body);
      response.success(req, res, 'Created', 200);
   } catch(error) {
      next(error);
   }
}

router.get('/', list);
router.get('/:id', get);
router.post('/', secure('create'), upsert);
router.put('/', secure('update'), upsert);


module.exports = router;

