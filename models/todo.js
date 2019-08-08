var mongoose = require('mongoose')

var todo = new mongoose.Schema({
  title: String,
  description: String,
  priority: { type: String, default: 'Must Do' },
  date_created: { type: Date, default: Date.now },
  completed: { type: String, default: '' }
})

module.exports = mongoose.model('todo', todo)
