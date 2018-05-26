// requirements
const db = require("../models");
const passport = require("passport");

exports.register = async function(req, res, next) {
  let { username, email, photo } = req.body;

  photo = (photo === "" ? undefined : photo);

  const user = { username, email, photo };

  try {
    await db.User.register(new db.User(user), req.body.password);
    passport.authenticate("local")(req, res, () => {
      req.flash("success", "Registration successful!");
      res.redirect("/secret");
     });
  }

  catch(err) {
    if (err.code === 11000) {
      err.message = "Sorry, that username or email is taken";
    }

    req.flash("error", err.message);
    return res.redirect("/register");
  }
};