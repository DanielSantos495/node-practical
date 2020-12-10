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


module.exports = {
   list,
}
