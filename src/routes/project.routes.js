const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const connectEnsureLogin = require("connect-ensure-login");

router.get("/", projectController.getProjects,connectEnsureLogin.ensureLoggedIn());
router.get("/:id", projectController.getProject,connectEnsureLogin.ensureLoggedIn());

// If Admin
router.post("/", projectController.createProject,connectEnsureLogin.ensureLoggedIn());
router.delete("/:id", projectController.deleteProject,connectEnsureLogin.ensureLoggedIn());
router.put("/:id", projectController.updateProject,connectEnsureLogin.ensureLoggedIn());

module.exports = router;
