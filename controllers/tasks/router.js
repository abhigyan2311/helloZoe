const express = require("express");

const { manageTaskController } = require("./getManageTask");
const { getAddTaskController } = require("./getAddTask");
const { editTaskController } = require("./postEditTask");
const { postAddTaskController } = require("./postAddTask");
const { postDeleteTaskController } = require("./postDeleteTask");

// Initialize router
const taskRouter = express.Router({ mergeParams: true });

//Task Routes
taskRouter.route("/managetasks").get(manageTaskController);
taskRouter.route("/addTask").get(getAddTaskController);
taskRouter.route("/editTask").post(editTaskController);
taskRouter.route("/addTask").post(postAddTaskController);
taskRouter.route("/delete/:id").post(postDeleteTaskController);

module.exports = taskRouter;
