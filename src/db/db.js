import Dexie from "dexie";

const db = new Dexie("PokedexDB");

db.version(1).stores({
  favorites: "id, name, imageUrl",
});

export default db;
