// requirements
const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");

// middleware and handlers
const { register } = require("../handlers/user");
const { isLoggedIn } = require("../middleware");

// models and db setup
const db = require("../models");

// Local strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, db.User.authenticate()
));


// routes
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", register);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post('/login', 
  passport.authenticate('local', {
    failureRedirect: '/users/login',
    failureFlash: "Invalid email or password",
    successRedirect: "/secret",
    successFlash: "You have logged in successfully!"
  }),
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You logged out!");
  res.redirect("/");
});


module.exports = router;