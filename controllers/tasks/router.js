const express = require("express");

const { manageTaskController } = require("./manageTask");

// Initialize router
const taskRouter = express.Router({ mergeParams: true });

//Task Routes
taskRouter.route("/managetasks").get(manageTaskController);

module.exports = taskRouter;
