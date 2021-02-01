const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const connectEnsureLogin = require("connect-ensure-login");

// If Admin
router.get("/", connectEnsureLogin.ensureLoggedIn(), userController.getUsers);
router.get("/:id", connectEnsureLogin.ensureLoggedIn(), userController.getUser);

// All users
router.get(
  "/profile",
  connectEnsureLogin.ensureLoggedIn(),
  userController.getUserProfile
);
router.put(
  "/profile",
  connectEnsureLogin.ensureLoggedIn(),
  userController.updateUserProfile
);
router.put(
  "/change-password",
  connectEnsureLogin.ensureLoggedIn(),
  userController.updateUserPassword
);

module.exports = router;
