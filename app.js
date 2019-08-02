// app goes here
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var methodOverride = require('method-override')
var seedDB = require('./seeds')
var todo = require('./models/todo_item')

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
seedDB()
mongoose.connect(
  'mongodb://localhost:27017/todo',
  { useNewUrlParser: true }
)

app.get('/', function (req, res) {
  res.render('landing')
})
app.get('/to-do', function (req, res) {
  todo.find({}, function (err, todo_list) {
    if (err) {
      console.log(err)
      res.redirect('/')
    } else {
      res.render('to-do', { todo_list: todo_list })
    }
  })
})

app.listen(3000, function () {
  console.log('online')
})
