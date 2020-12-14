const { nanoid } = require('nanoid');
const error = require('../../../utils/error');
const TABLE = 'post'

module.exports = (injectStore = require('../../../store/dummy')) => {

   const list = () => {
      return injectStore.list(TABLE);
   }

   const get = id => {
      return injectStore.get(TABLE, id);
   }

   const upsert = data => {
      const post = {
         id: data.id ? data.id : nanoid(),
         text: data.text,
         user: data.userId
      }

      console.log(post);
      return injectStore.upsert(TABLE, post)
   }
   return {
      list,
      get,
      upsert
   }
}