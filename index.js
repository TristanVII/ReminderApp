const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
// const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const session = require("express-session");

app.use(express.static(path.join(__dirname, "public")));

app.use(ejsLayouts);

app.set("view engine", "ejs");

// Session
const passport = require("./middleware/passport");
const authRoute = require("./routes/auth_route");
const indexRoute = require("./routes/index_route");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

//Default
app.use("/", indexRoute);
app.use("/auth", authRoute);



app.listen(3000, function () {
  console.log(
    "Server running. Visit: localhost:3000/reminders in your browser 🚀"
  );
});
