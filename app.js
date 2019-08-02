// app goes here
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var methodOverride = require('method-override')
var seedDB = require('./seeds')
var Todo = require('./models/todo_item')

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
// seedDB()
mongoose.connect(
  'mongodb://localhost:27017/todo',
  { useNewUrlParser: true }
)
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
      res.render('to-do', { todo_list: todo_list })
    }
  })
})

// SHOW FORM
app.get('/to-do/new', function (req, res) {
  res.render('new')
})
// CREATE NEW TODO
app.post('/to-do', function (req, res) {
  res.send('make a new todo')
})
// SHOW EDIT FOR ONE PARTICULAR TODO
app.get('/to-do/:id/edit', function (req, res) {
  res.send('make a new todo')
})
// UPDATE TODO, REDIRECT BACK TO /TO-DO
// app.PUT('/to-do/:id', function (req, res) {
//   res.send('make a new todo')
// })
// // DESTROY
// app.DELETE('/to-do/:id', function (req, res) {
//   res.send('make a new todo')
// })
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

app.listen(3000, function () {
  console.log('online')
})
