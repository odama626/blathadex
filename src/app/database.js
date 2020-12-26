import Dexie from 'dexie';

const db = new Dexie('critterDb');

db.version(1).stores({
  caught: `++id, type, no`,
});

db.version(2).stores({
  caught: `++id, [type+no]`,
});

db.version(3).stores({
  caught: `++id, [type+no]`,
  grown: `++id, [genus+color]`,
  collected: `++id, name`,
});

export default db;
