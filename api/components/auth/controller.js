const jwt = require('../../../auth');
const bcrypt = require('bcrypt');
const TABLA = 'auth';

module.exports = (injectStore = require('../../../store/dummy')) => {

   const login = async (username, password) => {
      const data = await injectStore.query(TABLA, { username: username });

      const samePass = await bcrypt.compare(password, data.password);
      if (samePass) {
         delete data.password;
         return jwt.sign(data);
      } else {
         console.log('pass invalid');
         throw new Error('Invalid data');
      }
   }

   const upsert = async data => {
      const authData = {
         id: data.id
      };

      if (data.username) {
         authData.username = data.username;
      }

      if (data.password) {
         authData.password = await bcrypt.hash(data.password, 6);
      }

      return injectStore.upsert(TABLA, authData)
   }

   return {
      upsert,
      login
   };

};