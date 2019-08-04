// var mongoose = require('mongoose')
var Todo = require('./models/todo_item')

var data = [
  {
    title: 'click to mark as done!',
    description: 'you got more info!',
    priority: 'MUST'
  },
  {
    title: 'Hover to show the delete button!',
    description: 'you got more info!',
    priority: 'MUST'
  },
  {
    title: 'complete this web app',
    description: 'hover to show delete button!',
    priority: 'MUST'
  },
  {
    title: 'put on resume',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    priority: 'SHOULD'
  },
  {
    title: 'Get Job',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    priority: 'WOULD'
  },
  {
    title: 'Make beaucoup bucks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    priority: 'MUST'
  }
]

function seedDB () {
  // Remove all campgrounds
  Todo.deleteMany({}, function (err) {
    if (err) {
      console.log(err)
    }
    console.log('destroyed old todo list')
    data.forEach(function (seed) {
      Todo.create(seed, function (err, todo) {
        if (err) {
          console.log(err)
        } else {
          console.log('added a todo')
          todo.save()
        }
      })
    })
  })
}

module.exports = seedDB
