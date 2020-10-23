const express = require("express");

const { homeController } = require("./home");

// Initialize router
const homeRouter = express.Router({ mergeParams: true });

//Room Routes
homeRouter.route("/").get(homeController);

module.exports = homeRouter;
