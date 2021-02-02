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
          res.json(data);
        }
      });
    }
  });
};

exports.getProject = function (req, res) {
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
      Project.getProject(req.params.id, function (err, data) {
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
// exports.updateProfile = function (req, res) {
//   let checkResult = validate(req.body, constraints.updateUserProfile);
//   if (checkResult) {
//     console.log(checkResult);
//     res.status(406).send({
//       error: true,
//       message: {
//         text: "Entered data are not acceptable",
//         details: checkResult,
//       },
//     });
//   } else {
//     User.updateUserProfile(req.user.id, req.body, function (err, user) {
//       if (err) {
//         console.log(err);
//         res.status(406).send({
//           error: true,
//           message: {
//             text: err.sqlMessage
//               ? err.sqlMessage
//               : "Entered data are not acceptable",
//             details: err,
//           },
//         });
//       } else {
//         res.json({
//           error: false,
//           message: "Profile updated successfully!",
//           data: user,
//         });
//       }
//     });
//   }
// };

// exports.getUser = function (req, res) {
//   User.getUserById(req.user.id, function (err, user) {
//     if (err) res.send(err);
//     res.json(user);
//   });
// };

// exports.getUsers = function (req, res) {
//   User.getUserById(req.user.id, function (err, user) {
//     if (err) res.send(err);
//     if (!user.is_admin) {
//       res.status(406).send({
//         error: true,
//         message: {
//           text: "You don't have permission!",
//           details: null,
//         },
//       });
//     } else {
//       User.getUsers(function (err, users) {
//         if (err) res.send(err);
//         res.json(users);
//       });
//     }
//   });
// };

// exports.getUserItem = function (req, res) {
//   User.getUserById(req.user.id, function (err, user) {
//     if (err) res.send(err);
//     console.log(user.is_admin);
//     if (!user.is_admin) {
//       res.status(406).send({
//         error: true,
//         message: {
//           text: "You don't have permission!",
//           details: null,
//         },
//       });
//     } else {
//       User.getUserById(req.params.id, function (err, user) {
//         if (err) res.send(err);
//         res.json(user);
//       });
//     }
//   });
// };

// exports.changePassword = function (req, res) {
//   let checkResult = validate(req.body, constraints.changePassword);
//   if (checkResult) {
//     res.status(406).send({
//       error: true,
//       message: {
//         text: "Entered data are not acceptable",
//         details: checkResult,
//       },
//     });
//   } else {
//     User.findById(req.user.id, function (err, user) {
//       if (!err && user[0]) {
//         const hashedPass = utils.saltHash(req.body.oldPassword, user[0].salt);
//         if (hashedPass.passwordHash === user[0].password) {
//           User.changePassword(
//             { ...req.body, password: req.body.password },
//             function (err, result) {
//               if (!err) {
//                 res.json({
//                   error: false,
//                   message: "Password changed successfully!",
//                   data: null,
//                 });
//               } else {
//                 res.status(406).send({
//                   error: true,
//                   message: {
//                     text: err.sqlMessage
//                       ? err.sqlMessage
//                       : "Entered data are not acceptable",
//                     details: err,
//                   },
//                 });
//               }
//             }
//           );
//         } else {
//           return done(Error("Username or password is incorrect!"), null);
//         }
//       } else {
//         return done(err, null);
//       }
//     });
//   }
// };
