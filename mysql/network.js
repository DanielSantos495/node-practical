const { Route } = require('express');
const express = require('express');
const response = require('../network/response');
const store = require('../store/mysql');
const router = express.Router();

const list = async (req, res, next) => {
   const { table } = req.params;
   try {
      const data = await store.list(table);
      response.success(req, res, data, 200);
   } catch(error) {
      next(error);
   }
}

const get = async (req, res, next) => {
   const { table, id } = req.params;
   try {
      const data = await store.get(table, id);
      response.success(req, res, data, 200);
   } catch(error) {
      next(error);
   }
}

const insert = async (req, res, next) => {
   const { params, body } = req;
   try {
      const data = await store.insert(params.table, body);
      response.success(req, res, data, 200);
   } catch(error) {
      next(error);
   }
}

const upsert = async (req, res, next) => {
   const { params, body } = req;
   try {
      const data = await store.upser(params.table, body);
      response.success(req, res, data, 200);
   } catch(error) {
      next(error);
   }
}

// Routes
router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table', upsert);

module.exports = router;