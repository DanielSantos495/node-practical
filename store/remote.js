// Archivo de conexión con el microservicio, (intermediario)
const request = require('request');

function createRemoteDB(host, port) {
   const URL = `http://${host}:${port}`;

   const req = (method, table, data) => {
      let url = `${URL}/${table}`;
      let body = '';

      if (method === 'GET' && data) {
         url += `/${data}`
      } else if (data) {
         body = JSON.stringify(data);
      }

      return new Promise((resolve, reject) => {
         request({
            method,
            headers: {
               'content-type': 'application/json',
            },
            url,
            body
         }, (error, req, body) => {
            if (error) {
               console.error('Error with BD remote', error);
               return reject(error.message)
            }
            console.log(body,'body remote')
            const response = JSON.parse(body);
            return resolve(response)
         });
      });
   }

   const list = table => {
      return req('GET', table);
   }
   const get = (table, id) => {
      return req('GET', table, id);
   }
   const insert = (table, data) => {
      return req('POST', table, data);
   }
   const update = (table, data) => {
      return req('PUT', table, data);
   }
   const upsert = async (table, data) => {
      let be = [];
      if (data.id) {
         be = await get(table, data.id)
      }

      if (be.length > 0) {
         return update(table, data)
      } else {
         return insert(table, data)
      }
   }
   const query = (table, query, join) => {
      return req('PUT', `${table}/${query}`, { query, join });
   }


   return {
      list,
      get,
      upsert,
      query
   }
}

module.exports = createRemoteDB;