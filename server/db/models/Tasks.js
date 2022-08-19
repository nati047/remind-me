const Sequelize = require("sequelize");
const db = require("../db");

const Task = db.define("task", {
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  frequency: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Task;
