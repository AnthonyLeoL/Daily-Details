var express = require('express')
var router = express.Router()
var User = require('../models/user')
var passport = require('passport')
var Todo = require('../models/todo')
var middleware = require('../middleware/index')
const minUsernameLength = 5
const minPasswordLength = 8

// LANDING PAGE
router.get('/', function (req, res) {
  res.render('user/landing')
})

// AUTH ROUTES
router.get('/register', function (req, res) {
  res.render('user/register')
})
router.post('/register', function (req, res) {
  if (middleware.constraintError(req.body.username, minUsernameLength)) {
    req.flash(
      'error',
      'username must be at least ' + minUsernameLength + ' characters long'
    )
    return res.redirect('/register')
  }
  if (middleware.constraintError(req.body.password, minUsernameLength)) {
    req.flash(
      'error',
      'password must be at least ' + minPasswordLength + ' characters long'
    )
    return res.redirect('/register')
  }
  var newUser = new User({ username: req.body.username })
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err)
      req.flash('error', err.message)
      return res.redirect('/register')
    }
    Todo.create(middleware.sampleData, function (err, todos) {
      todos.forEach(function (todo) {
        user.todo.push(todo)
      })
      user.save()
    })
    passport.authenticate('local')(req, res, function () {
      req.flash(
        'success',
        'welcome to DailyDetails, ' + req.body.username + '!'
      )
      res.redirect('/to-do')
    })
  })
})

router.get('/login', function (req, res) {
  res.render('user/login')
})
router.put('/:id', function (req, res) {
  User.findById(req.params.id, function (err, updatedUser) {
    if (err) {
      console.log(err)
      req.flash('error', err.message)
    } else {
      if (!updatedUser.showCompleted) {
        updatedUser.showCompleted = 'hide'
      } else {
        updatedUser.showCompleted = ''
      }
      updatedUser.save()
    }
    res.redirect('/to-do')
  })
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/to-do',
    failureRedirect: '/login',
    failureFlash: 'incorrect username or password',
    successFlash: 'Welcome Back!'
  }),
  function (req, res) {}
)

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

module.exports = router
