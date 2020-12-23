const Remote = require('./remote');
const { cacheService } = require('../config');

module.exports = new Remote(cacheService.host, cacheService.port);