const express = require("express");
const router = express.Router();
const reminderController = require("../controller/reminder_controller");
// can add isAdmin

const { ensureAuthenticated } = require("../middleware/check_auth");

//only if ensureAuthenticated returns true, will u render reminders
router.get("/reminders", ensureAuthenticated, (req, res) => {
  res.render("reminder/index", { reminders: req.user.reminders });
});

router.get("/reminder/new", ensureAuthenticated, (req, res) => {
  res.render("reminder/create");
});

router.get("/reminder/:id", ensureAuthenticated, (req, res) => {
  let reminderToFind = req.params.id;
  let searchResult = req.user.reminders.find(function (reminder) {
    return reminder.id == reminderToFind;
  });
  if (searchResult != undefined) {
    res.render("reminder/single-reminder", { reminderItem: searchResult });
  } else {
    //redirect user if searches for reminder outside of range
    res.redirect("/reminders");
  }
});

router.get("/reminder/:id/edit", ensureAuthenticated, (req, res) => {
  let reminderToFind = req.params.id;
  let searchResult = req.user.reminders.find(function (reminder) {
    return reminder.id == reminderToFind;
  });
  res.render("reminder/edit", { reminderItem: searchResult });
});

router.post("/reminder/", ensureAuthenticated, (req, res) => {
  console.log(req.user);
  let reminder = {
    id: req.user.reminders.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: false,
  };
  req.user.reminders.push(reminder);
  res.redirect("/reminders");
});

// Implement this yourself
router.post("/reminder/update/:id", ensureAuthenticated, (req, res) => {
  let reminderId = req.params.id;
  let searchResult = req.user.reminders.find(function (reminder) {
    return reminder.id == reminderId;
  });
  //has to be better way to do
  searchResult.title = req.body.title;
  searchResult.description = req.body.description;
  searchResult.completed = req.body.completed;
  if (searchResult.completed === "true") {
    searchResult.completed = true;
  } else {
    searchResult.completed = false;
  }

  for (let i in req.user.reminders) {
    if (req.user.reminders[i].id == reminderId) {
      req.user.reminders[i] = searchResult;
    }
  }
  res.redirect("/reminders");
});

// Implement this yourself
router.post("/reminder/delete/:id", ensureAuthenticated, (req, res) => {
  let reminderId = req.params.id;
  let searchResult = req.user.reminders.find(function (reminder) {
    return reminder.id == reminderId;
  });
  req.user.reminders.pop(searchResult);
  res.redirect("/reminders");
});

router.get("/logout", ensureAuthenticated, (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
