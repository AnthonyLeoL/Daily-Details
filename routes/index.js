var express = require('express')
var router = express.Router()
var User = require('../models/user')
var passport = require('passport')
var middleware = require('../middleware/index')

// LANDING PAGE
router.get('/', function (req, res) {
  res.redirect('/to-do')
})

// AUTH ROUTES
router.get('/register', function (req, res) {
  res.render('register')
})
router.post('/register', function (req, res) {
  var newUser = new User({ username: req.body.username })
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err)
      req.flash('error', err.message)
      return res.redirect('register')
    }
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
  res.render('login')
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
