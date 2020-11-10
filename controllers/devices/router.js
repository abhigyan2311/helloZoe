const express = require("express");

const { getAddDevicesController } = require("./getAddDevices");

// Initialize router
const deviceRouter = express.Router({ mergeParams: true });

//Task Routes
deviceRouter.route("/addDevices").get(getAddDevicesController);

module.exports = deviceRouter;