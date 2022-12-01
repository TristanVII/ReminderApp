const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/check_auth");

const router = express.Router();

//if user already logged in (session) forward /login to /dashboard /// avoid all after forwardAuth
router.get("/login", forwardAuthenticated, (req, res) =>
  res.render("auth/login")
);

router.post(
  "/login",
  //local is the strategy(username, password... Could add facebook, twitter, google)
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
