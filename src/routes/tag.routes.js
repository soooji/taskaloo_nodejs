const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tag.controller");
const connectEnsureLogin = require("connect-ensure-login");
const passport = require("passport");

router.get(
  "/",
  tagController.getTags,
  passport.authenticate("jwt", { session: false })
);
router.post(
  "/",
  tagController.createTag,
  passport.authenticate("jwt", { session: false })
);

module.exports = router;
