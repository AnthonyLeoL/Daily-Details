var express = require('express')
var router = express.Router()
var Todo = require('../models/todo_item')
// INDEX (rename)
router.get('/', function (req, res) {
  Todo.find({}, function (err, todo_list) {
    if (err) {
      console.log(err)
      res.redirect('/to-do')
    } else {
      res.render('index', { todo_list: todo_list })
    }
  })
})

// NEW
router.get('/new', function (req, res) {
  res.render('new')
})
// CREATE
router.post('/', isLoggedIn, function (req, res) {
  Todo.create(req.body.new, function (err, newTodo) {
    if (err) {
      console.log(err)
    }
    res.redirect('/to-do')
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
    }
    res.redirect('/to-do')
  })
})
// DESTROY
router.delete('/:id', function (req, res) {
  Todo.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log(err)
    }
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

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

module.exports = router
