const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tag.controller");
const connectEnsureLogin = require("connect-ensure-login");

router.get("/", tagController.getTags,connectEnsureLogin.ensureLoggedIn());
router.post("/", tagController.createTag,connectEnsureLogin.ensureLoggedIn());

module.exports = router;
