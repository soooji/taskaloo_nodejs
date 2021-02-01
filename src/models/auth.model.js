"use strict";
var dbConn = require("./../../config/db.config");
var utils = require("../../utils/main.utils");

//user object create

var User = function (user) {
  this.username = user.username;
  this.email = user.email;
  this.security_question = user.security_question;
  this.security_answer = user.security_answer;

  let hashResult = utils.saltHash(user.password);
  this.password = hashResult.passwordHash;
  this.salt = hashResult.salt;
};

User.register = function (newUser, result) {
  dbConn.query("INSERT INTO users set ?", newUser, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};


User.changePassword = function (user, result) {
  dbConn.query(
    "UPDATE users SET password=? WHERE username = ?",
    [
      user.password,
      user.username
    ],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
module.exports = User;
