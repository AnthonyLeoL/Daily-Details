var mongoose = require('mongoose')

var priority_level = {
  MUST: 3,
  SHOULD: 2,
  WOULD_BE: 1
}
var todo_item = new mongoose.Schema({
  title: String,
  description: String,
  priority: Number,
  date_created: { type: Date, default: Date.now },
  comments: []
})

module.exports = mongoose.model('todo', todo_item)
