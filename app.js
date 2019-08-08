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

var indexRoutes = require('./routes/index')
var todoRoutes = require('./routes/todo')

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
app.use(indexRoutes)
app.use('/to-do', todoRoutes)
app.listen(process.env.PORT || 4444, function () {
  console.log('online')
})
