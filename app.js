// app goes here
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var methodOverride = require('method-override')

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.get('/', function (req, res) {
  res.render('landing')
})
app.get('/to-do', function (req, res) {
  res.render('to-do')
})

app.listen(3000, function () {
  console.log('online')
})
