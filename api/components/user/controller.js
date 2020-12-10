
const { nanoid } = require('nanoid');
const auth = require('../auth')
const TABLE = 'user';

module.exports = (injectStore = require('../../../store/dummy')) => {
   const list = () => {
      return injectStore.list(TABLE)
   }

   const get = id => {
      return injectStore.get(TABLE, id)
   }

   const upsert = async data => {
      const user = {
         id: data.id ? data.id : nanoid(),
         name: data.name,
         username: data.username,
      };

      if (data.password || data.username) {
         await auth.upsert({
            id: user.id,
            username: user.username,
            password: data.password
         })
      }
      return injectStore.upsert(TABLE, user);
   }

   return {
      list,
      get,
      upsert
   }
};