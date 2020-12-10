const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

const sign = (data) => {
   return jwt.sign({ data }, secret);
}

// verificar si el token es correcto
const verify = token => {
 return jwt.verify(token, secret)
}

// Sacar el token del headers
const getToken = auth => {
   if (!auth) {
      throw error('Not token', 401);
   }
   // Validar formato del header (con -1 es que no lo encuentra)
   if (auth.indexOf('Bearer ') === -1) {
      throw error('Invalid format', 401);
   }
   const token = auth.replace('Bearer ', '');
   return token;
}

// Decodificar el token
const decodeHeader = req => {
   const authorization = req.headers.authorization || '';
   const token = getToken(authorization);
   const decoded = verify(token);

   req.user = decoded;

   return decoded;
}

// Comprobar si el token es del indicado
const check = {
   own: (req, owner) => {
      const { data } = decodeHeader(req);
      if(data.id !== owner) {
         throw error('Not have permission', 401);
      }
   },
}

module.exports = {
   sign,
   check,
}