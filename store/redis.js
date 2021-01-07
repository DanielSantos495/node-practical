const redis = require('redis');
const { redisConfig } = require('../config');

const client = redis.createClient({
   host: redisConfig.host,
   port: redisConfig.port,
   password: redisConfig.password
});

const list = table => {
   return new Promise((resolve, reject) => {
      client.get(table, (error, data) => {
         if (error) {
            reject(error)
         }

         let result = data || null;
         if (data) {
            result = JSON.parse(data);
         }
         resolve(result)
      })
   })
}

const get = (table, id) => {
   const search = `${table}_${id}`
   return list(search);
}

const upsert = async (table, data) => {
   let key = table;
   if (data && data.id) {
      key  = `${key}_${data.id}`
   }
   // Segundo parámetro, es el tiempo de expiración del cache
   client.setex(key, 10, JSON.stringify(data));
   return true;
}

module.exports = {
   list,
   get,
   upsert
}