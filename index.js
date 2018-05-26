/* --- SETUP --- */

// require packages
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const flash = require('connect-flash');

// init app
var app = express();

// require models and db setup
const db = require("./models");

// set template engine
app.set("view engine", "ejs");

// use body bodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));

// set static folder
app.use(express.static(__dirname + "/public"));

// use session, secrest is used to encrypt data
app.use(expressSession({
  secret: "This is my secret password!",
  resave: true,
  saveUninitialized: true
}));

// use passport
app.use(passport.initialize());
app.use(passport.session());

// reading, encoding, decoding sessions
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

// use flash messages
app.use(flash());

// assign flash variables
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.user = req.user;
  next();
})




/* --- ROUTES --- */

// require routes
const indexRoutes = require("./routes");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// use routes
app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);




/* --- SERVER --- */

// set port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
  console.log("---------------------------------------------");
  console.log(`Authentication app has started. Listening on port ${app.get('port')}`);
  console.log("---------------------------------------------");
});