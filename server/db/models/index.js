const User = require('./Users')
const Task = require('./Tasks')

// assosiations
User.hasMany(Task);
Task.belongsTo(User);

module.exports = {
  User,
  Task
}