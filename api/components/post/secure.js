const jwt = require('../../../auth');

module.exports = checkAuth = action => {
   const middleware = (req, res, next) => {
      switch(action) {
         case 'update':
            /* Comparamos si el id que se envia es el mismo del token */
            const owner = req.body.userId;
            jwt.check.own(req, owner);
            /* Al final ponemos next, porque si todo sale bien, debe  continuar con la siguiente
            función despues del middleware */
            next();
            break;
         case 'create':
            jwt.check.logged(req);
            next();
            break;
         default:
            next();
      }
   }
   return middleware ;
}