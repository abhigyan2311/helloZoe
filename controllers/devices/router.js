const express = require("express");

const { getAddDevicesController } = require("./getAddDevices");
const { getDeviceController } = require("./getSingleDevice");
const { postAddDevicesController } = require("./postAddDevices");
const { postDeleteDevicesController } = require("./postDeleteDevice");

// Initialize router
const deviceRouter = express.Router({ mergeParams: true });

//Task Routes
deviceRouter.route("/addDevices").get(getAddDevicesController);
deviceRouter.route("/:deviceID").get(getDeviceController);
deviceRouter.route("/addDevices").post(postAddDevicesController);
deviceRouter.route("/delete/:deviceID").post(postDeleteDevicesController);

module.exports = deviceRouter;