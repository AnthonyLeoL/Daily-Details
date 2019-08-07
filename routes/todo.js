var express = require('express')
var router = express.Router()
var Todo = require('../models/todo')
var User = require('../models/user')
var mongoose = require('mongoose')
var middleware = require('../middleware')

// INDEX (rename)
router.get('/', function (req, res) {
  var userId
  if (!req.user) {
    userId = mongoose.Types.ObjectId('5d4a3b374cbb011690971c37')
  } else {
    userId = req.user._id
  }
  User.findById(userId)
    .populate('todo')
    .exec(function (err, user) {
      if (err) {
        console.log(err)
        res.redirect('/to-do')
      } else {
        res.render('index', { todo_list: user.todo })
      }
    })
})

// NEW
router.get('/new', function (req, res) {
  res.render('new')
})
// CREATE
router.post('/', middleware.isLoggedIn, function (req, res) {
  User.findById(req.user._id, function (err, user) {
    Todo.create(req.body.new, function (err, newTodo) {
      if (err) {
        console.log(err)
      } else {
        user.todo.push(newTodo)
        user.save()
      }
      res.redirect('/to-do')
    })
  })
})
// EDIT
router.get('/:id/edit', function (req, res) {
  Todo.findById(req.params.id, function (err, todo_item) {
    if (err) {
      console.log(err)
      res.redirect('/to-do')
    } else {
      res.render('edit', { todo_item: todo_item })
    }
  })
})

// UPDATE
router.put('/:id', function (req, res) {
  Todo.findByIdAndUpdate(req.params.id, req.body.new, function (
    err,
    updatedTodo
  ) {
    if (err) {
      console.log(err)
      req.flash('error', err.message)
    }
    res.redirect('/to-do')
  })
})
router.put('/:id/complete', function (req, res) {
  Todo.findById(req.params.id, function (err, updatedTodo) {
    if (err) {
      console.log(err)
      req.flash('error', err.message)
    } else {
      if (!updatedTodo.completed) {
        updatedTodo.completed = 'completed'
      } else {
        updatedTodo.completed = ''
      }
      updatedTodo.save()
    }
    res.redirect('/to-do')
  })
})
// DESTROY
router.delete('/:id', middleware.isLoggedIn, function (req, res) {
  User.findById(req.user._id, function (err, user) {
    if (err) {
      console.log(err)
      req.flash('error', err.message)
    } else {
      user.todo.remove(req.params.id)
      Todo.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
          console.log(err)
          req.flash('error', err.message)
          res.redirect('/to-do')
        }
      })
    }
    req.flash('success', 'deleted todo!')
    res.redirect('/to-do')
  })
})
// SHOW
router.get('/:id', function (req, res) {
  Todo.findById(req.params.id, function (err, todo_item) {
    if (err) {
      console.log(err)
      res.redirect('/to-do')
    } else {
      res.render('show', { todo_item: todo_item })
    }
  })
})

module.exports = router
