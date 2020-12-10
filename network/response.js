exports.success = (req, res, message = '', status = 500) => {
   res.status(status).send({
      error: false,
      status,
      message,
   });
}

exports.error = (req, res, error = 'Internal error', status = 500, details) => {
   console.error(`[Response error]: ${details}`);
   res.status(status).send({
      status,
      error,
   });
}