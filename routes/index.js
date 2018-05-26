const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");


router.get("/", (req, res) => { 
  res.render("home");
});

router.get("/secret", isLoggedIn, (req, res) => {
  res.render("secret"); 
});


module.exports = router;