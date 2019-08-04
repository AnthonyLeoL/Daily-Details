// app goes here
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var methodOverride = require('method-override')
var seedDB = require('./seeds')
var passport = require('passport')
var localStrategy = require('passport-local')

var Todo = require('./models/todo_item')
var User = require('./models/user')

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

seedDB()

mongoose.connect(
  'mongodb://localhost:27017/todo',
  { useNewUrlParser: true }
)
mongoose.set('useFindAndModify', false)

// config passport
app.use(
  require('express-session')({
    secret: 'Ghost is the Most',
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  next()
})
// LANDING PAGE
app.get('/', function (req, res) {
  res.render('landing')
})
// INDEX (rename)
app.get('/to-do', function (req, res) {
  Todo.find({}, function (err, todo_list) {
    if (err) {
      console.log(err)
      res.redirect('/')
    } else {
      res.render('index', { todo_list: todo_list })
    }
  })
})

// NEW
app.get('/to-do/new', function (req, res) {
  res.render('new')
})
// CREATE
app.post('/to-do', isLoggedIn, function (req, res) {
  Todo.create(req.body.new, function (err, newTodo) {
    if (err) {
      console.log(err)
    }
    res.redirect('/to-do')
  })
})
// EDIT
app.get('/to-do/:id/edit', function (req, res) {
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
app.put('/to-do/:id', function (req, res) {
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
app.delete('/to-do/:id', function (req, res) {
  Todo.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect('/to-do')
  })
})
// SHOW
app.get('/to-do/:id', function (req, res) {
  Todo.findById(req.params.id, function (err, todo_item) {
    if (err) {
      console.log(err)
      res.redirect('/to-do')
    } else {
      res.render('show', { todo_item: todo_item })
    }
  })
})

// AUTH ROUTES
app.get('/register', function (req, res) {
  res.render('register')
})
app.post('/register', function (req, res) {
  var newUser = new User({ username: req.body.username })
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err)
      return res.render('register')
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/to-do')
    })
  })
})

app.get('/login', function (req, res) {
  res.render('login')
})
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/to-do',
    failureRedirect: '/login'
    // ,failureMessage: 'incorrect username or password'
  }),
  function (req, res) {}
)

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}
app.listen(3000, function () {
  console.log('online')
})
