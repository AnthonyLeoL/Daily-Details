var mongoose = require('mongoose')

var todo = new mongoose.Schema({
  title: String,
  description: String,
  priority: String,
  date_created: { type: Date, default: Date.now },
  completed: Boolean
})

module.exports = mongoose.model('todo', todo)
