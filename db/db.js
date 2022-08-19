const Sequelize = require("sequelize");
require("dotenv").config();

const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : process.env.DEV_DATABASE_URL;

const db = new Sequelize(connectionString, {
  logging: false,
});

// test connection
const test = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
test();

module.exports = db;
