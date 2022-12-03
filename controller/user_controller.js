const { registerSubmit } = require("./auth_controller");

const userModel = require("../database").userModel;
const database = require("../database").database;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

const register = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let verify = userModel.findOne(email);
  if (verify === null) {
    let user = {
      id: Object.keys(database).length + 1,
      name: "",
      email: email,
      password: password,
      reminders: [],
    };
    database.push(user);
    res.redirect("/");
  } else {
    res.redirect("/auth/register");
  }
};

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  register,
};
