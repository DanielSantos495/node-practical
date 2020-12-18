// const store = require('../../../store/mysql');
const { remoteDB } = require('../../../config');

let store;

if (remoteDB === true) {
   store = require('../../../store/remoteMysql');
} else {
   store = require('../../../store/mysql');
}
const controller = require('./controller');

module.exports = controller(store);