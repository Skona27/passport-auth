// require mongoose
const mongoose = require("mongoose");

// set debug mode
// we can see actual mongo queries
mongoose.set("debug", true);

// use promises 
mongoose.Promise = Promise;

// connect to DB
mongoose.connect("mongodb://localhost/passport-auth-2", { keepAlive: true });

module.exports.User = require("./User");