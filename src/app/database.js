import Dexie from 'dexie';

const db = new Dexie('critterDb');

db.version(1).stores({
  caught: `++id, type, no`,
});

db.version(2).stores({
  caught: `++id, [type+no]`,
});

export default db;
