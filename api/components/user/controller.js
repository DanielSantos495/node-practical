
const { nanoid } = require('nanoid');
const auth = require('../auth')
const TABLE = 'user';

module.exports = (injectStore = require('../../../store/dummy'), injectCache = require('../../../store/dummy')) => {
   const list = async () => {
      let users = await injectCache.list(TABLE);

      if (!users) {
         console.log('It is not in cache. Search in DB')
         users = await injectStore.list(TABLE);
         injectCache.upsert(TABLE, users)
      } else {
         console.log('Take data of cache')
      }

      return users;
   }

   const get = id => {
      return injectStore.get(TABLE, id);
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
         });
      }
      return injectStore.upsert(TABLE, user);
   }

   const follow = (from, to) => {
      console.log(from,'from', to, 'to')
      return injectStore.upsert(`${TABLE}_follow`, {
         user_from: from,
         user_to: to
      });
   }

   const following = async id => {

      const join = {};
      join[TABLE] = 'user_to'; //Aquí hacemos como un JOIN de mysql y unimos los user_to a la table 'user'
      const query = { user_from: id };

      return await injectStore.query(`${TABLE}_follow`, query, join);
   }

   return {
      list,
      get,
      upsert,
      follow,
      following
   }
};