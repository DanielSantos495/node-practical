const error = (message, status) => {
   let e = new Error(message);

   if (status) {
      e.statusCode = status;
   }

   return e;
}

module.exports = error;