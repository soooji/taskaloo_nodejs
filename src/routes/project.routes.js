const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
// const connectEnsureLogin = require("connect-ensure-login");
const passport = require("passport");

router.get(
  "/",
  projectController.getProjects,
  passport.authenticate("jwt", { session: false })
);
router.get(
  "/:id",
  projectController.getProject,
  passport.authenticate("jwt", { session: false })
);

// If Admin
router.post(
  "/",
  projectController.createProject,
  passport.authenticate("jwt", { session: false })
);
router.delete(
  "/:id",
  projectController.deleteProject,
  passport.authenticate("jwt", { session: false })
);
router.put(
  "/:id",
  projectController.updateProject,
  passport.authenticate("jwt", { session: false })
);

module.exports = router;
