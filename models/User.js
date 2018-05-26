var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    unique: true
  },
  photo: {
    type: String,
    default: "http://mehandis.net/wp-content/uploads/2017/12/default-user-300x300.png"
  },
});

// adding methods from passport to our user schema
// authenticate with email
UserSchema.plugin(passportLocalMongoose, { usernameField : 'email' });

module.exports = mongoose.model("User", UserSchema);