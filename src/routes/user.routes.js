const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const connectEnsureLogin = require("connect-ensure-login");

// All users
router.get(
  "/profile",
  connectEnsureLogin.ensureLoggedIn(),
  userController.getUser
);

router.put(
  "/profile",
  connectEnsureLogin.ensureLoggedIn(),
  userController.updateProfile
);

router.put(
  "/change-password",
  connectEnsureLogin.ensureLoggedIn(),
  userController.changePassword
);

// If Admin
router.get("/all", connectEnsureLogin.ensureLoggedIn(), userController.getUsers);
router.get(
  "/all/:id",
  connectEnsureLogin.ensureLoggedIn(),
  userController.getUserItem
);


module.exports = router;
