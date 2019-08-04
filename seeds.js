// var mongoose = require('mongoose')
var Todo = require('./models/todo')
var User = require('./models/user')

var data = [
  {
    title: 'click to mark as done!',
    description: 'you got more info!',
    priority: 'Must do'
  },
  {
    title: 'Hover to show the delete button!',
    description: 'you got more info!',
    priority: 'Must do'
  },
  {
    title: 'complete this web app',
    description: 'hover to show delete button!',
    priority: 'Must do'
  },
  {
    title: 'put on resume',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    priority: 'Should do'
  },
  {
    title: 'Get Job',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    priority: 'Would be nice'
  },
  {
    title: 'Make beaucoup bucks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    priority: 'Must do'
  }
]
var sampleUser = {
  username: 'New User',
  password: 'test test'
}

function seedDB () {
  // Remove all data
  Todo.deleteMany({}, function (err) {
    if (err) {
      console.log(err)
    } else {
      User.deleteMany({}, function (err) {
        if (err) {
          console.log(err)
        }
        console.log('destroyed old todo list')
        // create sample user
        User.create(sampleUser, function (err, newUser) {
          if (err) {
            console.log(err)
          } else {
            data.forEach(function (seed) {
              Todo.create(seed, function (err, todo) {
                if (err) {
                  console.log(err)
                } else {
                  newUser.todo.push(todo)
                  console.log('added a todo')
                  if (todo.title === 'Make beaucoup bucks') {
                    newUser.save()
                  }
                }
              })
            })
          }
        })
      })
    }
  })
}

module.exports = seedDB
