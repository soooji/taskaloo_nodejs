const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const connectEnsureLogin = require("connect-ensure-login");

router.get("/", taskController.getTasks, connectEnsureLogin.ensureLoggedIn()); //grouped by status including tags
router.post(
  "/",
  taskController.createTask,
  connectEnsureLogin.ensureLoggedIn()
); //including tag_id s
router.get("/:id", taskController.getTask, connectEnsureLogin.ensureLoggedIn()); //including comments and tags
router.put(
  "/:id",
  taskController.updateTask,
  connectEnsureLogin.ensureLoggedIn()
);
router.delete(
  "/:id",
  taskController.deleteTask,
  connectEnsureLogin.ensureLoggedIn()
);

router.post(
  "/:id/comment",
  taskController.comment,
  connectEnsureLogin.ensureLoggedIn()
);

router.delete(
  "/comment/:id",
  taskController.deleteComment,
  connectEnsureLogin.ensureLoggedIn()
);

module.exports = router;
