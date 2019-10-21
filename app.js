var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var passport = require("passport");
var localStrategy = require("passport-local");
var flash = require("connect-flash");

var User = require("./models/user");

var indexRoutes = require("./routes/index");
var todoRoutes = require("./routes/todo");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());

mongoose
  .connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(console.log("connected properly"))
  .catch(err => {
    console.log("ERR: " + err.message);
  });
mongoose.set("useFindAndModify", false);

// config passport
app.use(
  require("express-session")({
    secret: "Ghost is the Most",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});
app.use(indexRoutes);
app.use("/to-do", todoRoutes);
app.listen(process.env.PORT || 3000, function() {
  console.log("online");
});
