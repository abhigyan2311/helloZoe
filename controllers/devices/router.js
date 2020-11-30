const express = require("express");

const { getAddDevicesController } = require("./getAddDevices");
const { getDeviceController } = require("./getSingleDevice");
const { postAddDevicesController } = require("./postAddDevices");
const { postDeleteDevicesController } = require("./postDeleteDevice");
const { updateDevicesController } = require("./updateDevices");
const { postSearchDevicesController } = require("./postSearchDevice");

// Initialize router
const deviceRouter = express.Router({ mergeParams: true });

//Task Routes
deviceRouter.route("/addDevices").get(getAddDevicesController);
deviceRouter.route("/:deviceID").get(getDeviceController);
deviceRouter.route("/addDevices").post(postAddDevicesController);
deviceRouter.route("/delete/:deviceID").post(postDeleteDevicesController);
deviceRouter.route("/updateDevices").post(updateDevicesController);
deviceRouter.route("/searchDevices").post(postSearchDevicesController);
module.exports = deviceRouter;
