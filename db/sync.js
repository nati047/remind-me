const db = require("../db");

const syncDb = async () => {
  console.log("sync in progress...");
  try {
    const msg = await db.sync({ force: true });
    console.log("db synced!\n", msg);
  } catch (err) {
    console.error(err);
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
};


syncDb();

