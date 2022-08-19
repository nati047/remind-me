const Sequelize = require("sequelize");
// todo - remove hard coded url
const db = new Sequelize(
  process.env.DATABASE_URL ||
    "postgres://natnaeltekletsadik@localhost:5432/remindme",
  {
    logging: false,
  }
);

// test connection
const test = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
// test();

module.exports = db;
