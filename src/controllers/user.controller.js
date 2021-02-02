"use strict";
const User = require("../models/user.model");
var validate = require("validate.js");
var constraints = require("../validators/user.validators");
var utils = require("./../../utils/main.utils");

exports.updateProfile = function (req, res) {
  let checkResult = validate(req.body, constraints.updateUserProfile);
  if (checkResult) {
    console.log(checkResult);
    res.status(406).send({
      error: true,
      message: {
        text: "Entered data are not acceptable",
        details: checkResult,
      },
    });
  } else {
    User.updateUserProfile(req.user.id, req.body, function (err, user) {
      if (err) {
        console.log(err);
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
          message: "Profile updated successfully!",
          data: user,
        });
      }
    });
  }
};

exports.getUser = function (req, res) {
  User.getUserById(req.user.id, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.getUsers = function (req, res) {
  User.getUserById(req.user.id, function (err, user) {
    if (err) res.send(err);
    if (!user.is_admin) {
      res.status(406).send({
        error: true,
        message: {
          text: "You don't have permission!",
          details: null,
        },
      });
    } else {
      User.getUsers(function (err, users) {
        if (err) res.send(err);
        res.json(users);
      });
    }
  });
};

exports.getUserItem = function (req, res) {
  User.getUserById(req.user.id, function (err, user) {
    if (err) res.send(err);
    console.log(user.is_admin);
    if (!user.is_admin) {
      res.status(406).send({
        error: true,
        message: {
          text: "You don't have permission!",
          details: null,
        },
      });
    } else {
      User.getUserById(req.params.id, function (err, user) {
        if (err) res.send(err);
        res.json(user);
      });
    }
  });
};

exports.changePassword = function (req, res) {
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
    User.findById(req.user.id, function (err, user) {
      if (!err && user[0]) {
        const hashedPass = utils.saltHash(req.body.oldPassword, user[0].salt);
        if (hashedPass.passwordHash === user[0].password) {
          User.changePassword(
            { ...req.body, password: req.body.password },
            function (err, result) {
              if (!err) {
                res.json({
                  error: false,
                  message: "Password changed successfully!",
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
          return done(Error("Username or password is incorrect!"), null);
        }
      } else {
        return done(err, null);
      }
    });
  }
};