const express = require('express');
const secure = require('./secure');
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
   try {
      const user = await controller.upsert(body);
      response.success(req, res, user, 201);
   } catch(err) {
      next(err)
   }
}

const follow = async (req, res, next) => {
   const { user, params } = req;
   try {
      //from to // el req.user.id lo añadimos cuando verificamos el token
      const data = await controller.follow(user.data.id, params.id);
      response.success(req, res, data, 201)
   } catch(error) {
      next(error)
   }
}

const following = async (req, res, next) => {
   const { params } = req;
   try {
      const data = await controller.following(params.id);
      response.success(req, res, data, 200);
   } catch(error) {
      next(error)
   }
}

router.get('/', list);
router.get('/:id', get);
router.get('/following/:id', following);
router.post('/follow/:id', secure('follow'), follow);
router.post('/' ,upsert);
router.put('/', secure('update'), upsert);



module.exports = router;
