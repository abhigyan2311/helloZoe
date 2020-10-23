const express = require("express");

const { roomController } = require("./room");

// Initialize router
const roomRouter = express.Router({ mergeParams: true });

//Room Routes
roomRouter.route("/:roomname").get(roomController);

module.exports = roomRouter;
