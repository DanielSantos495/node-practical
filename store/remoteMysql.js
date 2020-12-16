// Se crea la instancia del constructor remote (donde creamos la conexión)
const Remote = require('./remote');
const { mysqlService } = require('../config');

module.exports = new Remote(mysqlService.host, mysqlService.port);