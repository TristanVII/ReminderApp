const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/check_auth");
const userController = require("../controller/user_controller");

const router = express.Router();

//if user already logged in (session) forward /Reminders else render auth/loging html
router.get("/login", forwardAuthenticated, (req, res) =>
  res.render("auth/login")
);

// Registration
router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", (req, res) => {
  userController.register(req, res);
});

// Login POST method
router.post(
  "/login",
  //local is the strategy(username, password... Could add facebook, twitter, google)
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);

//Logout
//Used session.destroy as dession.logout didnt work for me
router.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/"); //Inside a callback…
  });
});

module.exports = router;
