// middleware to check if user is logged in
exports.isLoggedIn = function (req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", "You must be logged in!");
    res.redirect("/users/login");
  }
}