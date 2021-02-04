"use strict";
const Project = require("../models/project.model");
const User = require("../models/user.model");
var validate = require("validate.js");
var constraints = require("../validators/project.validators");
var utils = require("./../../utils/main.utils");

exports.createProject = function (req, res) {
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
      let checkResult = validate(req.body, constraints.project);
      if (checkResult) {
        res.status(406).send({
          error: true,
          message: {
            text: "Entered data are not acceptable",
            details: checkResult,
          },
        });
      } else {
        Project.create(req.body, function (err, projectItem) {
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
            res.json({
              error: false,
              message: "Project added successfully!",
              data: projectItem,
            });
          }
        });
      }
    }
  });
};

exports.updateProject = function (req, res) {
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
      let checkResult = validate(req.body, constraints.project);
      if (checkResult) {
        res.status(406).send({
          error: true,
          message: {
            text: "Entered data are not acceptable",
            details: checkResult,
          },
        });
      } else {
        Project.updateProject(
          req.params.id,
          req.body,
          function (err, projectItem) {
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
              res.json({
                error: false,
                message: "Project updated successfully!",
                data: projectItem,
              });
            }
          }
        );
      }
    }
  });
};

exports.getProjects = function (req, res) {
  if (!req.user) {
    return res.status(406).send({
      error: true,
      message: {
        text: "You should login first!",
        details: null,
      },
    });
  } else {
    Project.getProjects(function (err, data) {
      if (err) {
        res.status(406).send({
          error: true,
          message: {
            text: err.sqlMessage
              ? err.sqlMessage
              : "Could not get target list.",
            details: err,
          },
        });
      } else {
        console.log(data);
        res.json(data);
      }
    });
  }
};

exports.getProject = function (req, res) {
  Project.getProject(req.params.id, function (err, data) {
    if (err) {
      res.status(406).send({
        error: true,
        message: {
          text: err.sqlMessage
            ? err.sqlMessage
            : "Could not get target project.",
          details: err,
        },
      });
    } else {
      let projectItem = data;
      Project.getProjectTasks(req.params.id, function (err, data) {
        if (err) {
          res.status(406).send({
            error: true,
            message: {
              text: err.sqlMessage
                ? err.sqlMessage
                : "Could not get target project tasks.",
              details: err,
            },
          });
        } else {
          projectItem["tasks"] = data;
          res.json(projectItem);
        }
      });
    }
  });
};

exports.deleteProject = function (req, res) {
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
      Project.deleteProject(req.params.id, function (err, data) {
        if (err) {
          res.status(406).send({
            error: true,
            message: {
              text: err.sqlMessage
                ? err.sqlMessage
                : "Could not get target item.",
              details: err,
            },
          });
        } else {
          res.json(data);
        }
      });
    }
  });
};
