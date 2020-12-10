const jwt = require('../../../auth');

module.exports = checkAuth = action => {
   const middleware = (req, res, next) => {
      switch(action) {
         case 'update':
            const owner = req.body.id;
            jwt.check.own(req, owner);
            /* Al final ponemos next, porque si todo sale bien, debe  continuar con la siguiente
            función despues del middleware */
            next();
            break;
         default:
            next();
      }
   }
   return middleware ;
}