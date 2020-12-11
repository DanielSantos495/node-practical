const mysql = require('mysql');
const config = require('../config');
// config para conectarnos a mysql
const dbconfig = {
   host: config.mysql.host,
   user: config.mysql.user,
   password: config.mysql.password,
   database: config.mysql.database
};

let connection;

const handleConnection = () => {
   // Creamos la conexión y le pasa el objeto de configuración
   connection = mysql.createConnection(dbconfig);
   // La conectamos
   connection.connect(error => {
      if (error) {
         console.error('[DB error]:',error);
         // Si hay un error, la reconectamos en 2 segundos
         setTimeout(handleConnection, 2000);
      } else {
         console.log('DB Connected')
      }
   });
   // Mientras esta conectada la DB se pierde la conexión entonces reconectar
   connection.on('error',error => {
      console.error('[DB error]:',error);

      if(error.code === 'PROTOCOL_CONNECTION_LOST') {
         handleConnection();
      } else {
         throw error;
      }
   })
}
handleConnection();

const list = table => {
   return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table}`, async (error, data) => {
         if (error) {
            reject(error);
         }
         resolve(data);
      });
   });
}

const get = (table, id) => {
   return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, async (error, data) => {
         if (error) {
            reject(error);
         }
         resolve(data);
      });
   });
}



const insert = (table, data) => {
   return new Promise((resolve, reject) => {
      /*El '?' despúes de SET es un comodín que nos completa toda la expresión y data es el valor */
      connection.query(`INSERT INTO ${table} SET ?`, data, async (error, result) => {
         if (error) {
            reject(error);
         }
         resolve(result);
      });
   })
}

const update = (table, data) => {
   return new Promise((resolve, reject) => {
      /*El '?' despúes de SET es un comodín que nos completa toda la expresión y data es el valor */
      connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], async (error, result) => {
         if (error) {
            reject(error);
         }
         console.log(data)
         resolve(result);
      });
   })
}

const upsert = async (table, data) => {
   const be = await get(table, data.id);
   if(be.length > 0) {
      console.log('update')
      return update(table, data)
   } else {
      console.log('post normal')
      return insert(table, data);
   }
}

const query = (table, query) => {
   return new Promise((resolve, reject) => {
      /*El '?' despúes de WHERE es un comodín que nos completa toda la expresión y data es el valor */
      connection.query(`SELECT * FROM ${table} WHERE ?`, query, (error, data) => {
         if (error) {
            reject(error);
         }
         resolve(data[0] || null);
      })
   })
}

module.exports = {
   list,
   get,
   upsert,
   query
}
