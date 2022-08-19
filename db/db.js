const Sequelize = require("sequelize");
require("dotenv").config();

const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : process.env.DEV_DATABASE_URL;

const devConnOptions = {
  logging: false,
};

const prodConnOptions = {
  logging: false,
  dialect: "postgres",
  ssl: true,
  dialectOptions: {
    ssl: true,
  },
};
const connectionOptions =
  process.env.NODE_ENV === "production" ? prodConnOptions : devConnOptions;

const db = new Sequelize(connectionString, connectionOptions);

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
