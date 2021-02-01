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
); //including tag_id s
router.delete(
  "/:id",
  taskController.deleteTask,
  connectEnsureLogin.ensureLoggedIn()
);

//comment
router.post(
  "/comment",
  taskController.postComment,
  connectEnsureLogin.ensureLoggedIn()
); //task_id should be in req body
router.delete(
  "/comment/:id",
  taskController.postComment,
  connectEnsureLogin.ensureLoggedIn()
); //if is the writer of task

module.exports = router;
