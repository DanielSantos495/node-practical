// const store = require('../../../store/mysql');
const { remoteDB } = require('../../../config');

let store, cache;

if (remoteDB === true) {
   store = require('../../../store/remoteMysql');
   cache = require('../../../store/remote-cache');
} else {
   store = require('../../../store/mysql');
   cache = require('../../../store/redis');
}
const controller = require('./controller');

module.exports = controller(store, cache);