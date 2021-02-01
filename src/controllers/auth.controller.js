"use strict";
const passport = require("passport");
const User = require("../models/auth.model");
var validate = require("validate.js");
var constraints = require("../validators/auth.validators");
var utils = require("./../../utils/main.utils");

exports.login = function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      q;
      console.log(err);
      return res.status(401).send({
        error: true,
        message: {
          text: "Password is incorrect",
          details: err,
        },
      });
    }

    if (!user) {
      return res.status(404).send({
        error: true,
        message: {
          text: "User not found",
          details: {},
        },
      });
    }
    req.login(user, (err) => {
      console.log(
        `req.session.passport: ${JSON.stringify(req.session.passport)}`
      );
      console.log(`req.user: ${JSON.stringify(req.user)}`);
      return res.send("You were authenticated & logged in!\n");
    });
  })(req, res, next);
};

exports.logout = function (req, res) {
  if (req.user) {
    console.log("User logged out:");
    console.log(req.user);
  }
  req.logout();
  return res.send("You are successfully logged out!\n");
};

exports.register = function (req, res) {
  //handles null error
  let checkResult = validate(req.body, constraints.register);
  if (checkResult) {
    res.status(406).send({
      error: true,
      message: {
        text: "Entered data are not acceptable",
        details: checkResult,
      },
    });
  } else {
    const new_user = new User(req.body);
    User.register(new_user, function (err, user) {
      if (err) {
        // res.send(err);
        res.status(406).send({
          error: true,
          message: {
            text: err.sqlMessage
              ? err.sqlMessage
              : "Entered data are not acceptable",
            details: err,
          },
        });
      } else {
        res.json({
          error: false,
          message: "User added successfully!",
          data: user,
        });
      }
    });
  }
};

exports.forgetPassword = function (req, res) {
  //handles null error
  let checkResult = validate(req.body, constraints.changePassword);
  if (checkResult) {
    res.status(406).send({
      error: true,
      message: {
        text: "Entered data are not acceptable",
        details: checkResult,
      },
    });
  } else {
    User.getUserSecurity(req.body.username, function (err, result) {
      if (err) {
        res.status(406).send({
          error: true,
          message: {
            text: err.sqlMessage
              ? err.sqlMessage
              : "Entered data are not acceptable",
            details: err,
          },
        });
      } else {
        let newPass = utils.saltHash(req.body.password, result[0].salt);
        if (
          result[0].security_question == req.body.security_question &&
          result[0].security_answer == req.body.security_answer
        ) {
          User.changePassword(
            { ...req.body, password: newPass.passwordHash },
            function (err, result) {
              if (!err) {
                res.json({
                  error: false,
                  message: "Password change successfully!",
                  data: null,
                });
              } else {
                res.status(406).send({
                  error: true,
                  message: {
                    text: err.sqlMessage
                      ? err.sqlMessage
                      : "Entered data are not acceptable",
                    details: err,
                  },
                });
              }
            }
          );
        } else {
          res.json({
            error: false,
            message: "Security answer is not cuurect!",
            data: null,
          });
        }
      }
    });
  }
};
