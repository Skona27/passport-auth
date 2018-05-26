// requirements
require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;


// GITHUB
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "http://localhost:3000/auth/github/return"
  },
  async function (accessToken, refreshToken, profile, done) {
    const searchQuery = {
      email: profile._json["email"]
    };

    const updates = {
      username: profile._json["login"],
      email: profile._json["email"],
      photo: profile._json["avatar_url"]
    };

    const options = {
      upsert: true,
      new: true
    };

    try {
      const user = await User.findOneAndUpdate(searchQuery, updates, options);
      return done(null, user);
    }
    catch(err) {
      return done(err);
    }
  }
));

router.get('/github/login', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/return',
  passport.authenticate('github', {
    failureRedirect: '/users/login',
    failureFlash: "Invalid email or password",
    successRedirect: "/secret",
    successFlash: "You have logged in successfully!"
  })
);




// FACEBOOK
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_SECRET_KEY,
  callbackURL: "http://localhost:3000/auth/facebook/return",
  profileFields: ['id', 'displayName', 'email', 'first_name', 'last_name', 'photos']
},
async function (accessToken, refreshToken, profile, done) {
  const searchQuery = {
    email: profile._json["email"]
  };

  const updates = {
    email: profile._json["email"],
    photo: profile._json["picture"].data.url
  };

  const options = {
    upsert: true,
    new: true
  };

  try {
    const user = await User.findOneAndUpdate(searchQuery, updates, options);
    return done(null, user);
  }
  catch(err) {
    return done(err);
  }
}
));

router.get('/facebook/login',
  passport.authenticate('facebook', { scope : ['email'] } ));

router.get('/facebook/return',
  passport.authenticate('facebook', {failureRedirect: '/users/login',
  failureFlash: "Invalid email or password",
  successRedirect: "/secret",
  successFlash: "You have logged in successfully!"}
  ));


module.exports = router;