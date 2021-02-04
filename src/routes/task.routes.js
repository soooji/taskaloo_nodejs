const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
// const connectEnsureLogin = require("connect-ensure-login");
const passport = require("passport");

router.get(
  "/",
  taskController.getTasks,
  passport.authenticate("jwt", { session: false })
); //grouped by status including tags
router.post(
  "/",
  taskController.createTask,
  passport.authenticate("jwt", { session: false })
); //including tag_id s
router.get(
  "/:id",
  taskController.getTask,
  passport.authenticate("jwt", { session: false })
); //including comments and tags
router.put(
  "/:id",
  taskController.updateTask,
  passport.authenticate("jwt", { session: false })
);
router.delete(
  "/:id",
  taskController.deleteTask,
  passport.authenticate("jwt", { session: false })
);

router.post(
  "/:id/comment",
  taskController.comment,
  passport.authenticate("jwt", { session: false })
);

router.delete(
  "/comment/:id",
  taskController.deleteComment,
  passport.authenticate("jwt", { session: false })
);

module.exports = router;
