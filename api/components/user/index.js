// const store = require('../../../store/mysql');
const store = require('../../../store/remoteMysql');
const controller = require('./controller');

module.exports = controller(store);