const db = require('./db');

const syncDb = async() => {
  console.log("sync in progress...");
  try {
    await db.sync({ force: true });
    console.log("db synced!");
  } catch (err) {
    console.error(err);
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  syncDb();
}