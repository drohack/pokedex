import Dexie from "dexie";

const db = new Dexie("PokedexDB");

db.version(1).stores({
  favorites: "id, name, imageUrl",
  locks: '++id', // Schema for locks
  ultimate151: '++id, kanto.id, favorite.id',
});

export default db;
