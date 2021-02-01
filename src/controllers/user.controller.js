"use strict";
const User = require("../models/user.model");
var validate = require("validate.js");
var constraints = require("../validators/user.validators");

exports.createUser = function (req, res) {
  let checkResult = validate(req.body, constraints.clientProfile);
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
    User.createClientProfile(req.user.username, req.body, function (err, user) {
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
          message: "Profile created successfully!",
          data: user,
        });
      }
    });
  }
};

exports.getUser = function (req, res) {
  User.getUser(req.user.username, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};
