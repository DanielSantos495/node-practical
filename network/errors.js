const response = require('./response');

const error = (error, req, res, next) => {
   console.error('[Error]:',error);

   let message = error.message || 'Internal error';
   let status = error.statusCode || 500;

   response.error(req, res, message, status);
}

module.exports = error;