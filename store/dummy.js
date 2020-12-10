const db = {
   'user': [
      {id: '1', name: 'Daniel'}
   ],
   'auth': [],
};

const list = async (table) => {
   return db[table] || [];
}

const get = async (table, id) => {
   const collection = await list(table);
   return await collection.filter(item => item.id === id)[0] || null;
}
const insert = async (table, data) => {
   db[table].push(data);
   console.log(db, 'method upsert');
}

const remove = async (table, id) => {
   const index = db[table].findIndex(item => item.id === id )
   db[table].splice(index, 1)
   return true
}

// Es para el Login
const query = async (table, q) => {
   const collection = await list(table);
   const keys = Object.keys(q)[0];
   return collection.filter(item => item[keys] === q[keys])[0] || null;
}

module.exports = {
   list,
   get,
   insert,
   remove,
   query
};