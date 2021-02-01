const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const connectEnsureLogin = require("connect-ensure-login");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get(
  "/logout",
  authController.logout,
  connectEnsureLogin.ensureLoggedIn()
);
router.post("/forgot-password", authController.forgetPassword);
module.exports = router;
