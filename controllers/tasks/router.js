const express = require("express");

const { manageTaskController } = require("./manageTask");
const { newTaskController } = require("./newTask");
const { addTaskController } = require("./addTask");

// Initialize router
const taskRouter = express.Router({ mergeParams: true });

//Task Routes
taskRouter.route("/managetasks").get(manageTaskController);
taskRouter.route("/newTask").get(newTaskController);
taskRouter.route("/addTask").get(addTaskController);

module.exports = taskRouter;
