const express = require("express");

const { getLoginController } = require("./getLogin");
const { postLoginController } = require("./postLogin");
const { getRegisterController } = require("./getRegister");
const { postRegisterController } = require("./postRegister");
const { getLogoutController } = require("./getLogout");
const { getDevicesController } = require("./getDevices");
const { getProfileController } = require("./getProfile");
const { getEditController } = require("./getEdit");

// Initialize router
const userRouter = express.Router({ mergeParams: true });

//User Routes
userRouter.route("/login").get(getLoginController);
userRouter.route("/login").post(postLoginController);
userRouter.route("/register").get(getRegisterController);
userRouter.route("/register").post(postRegisterController);
userRouter.route("/logout").get(getLogoutController);
userRouter.route("/devices").get(getDevicesController);
userRouter.route("/profile").get(getProfileController);
userRouter.route("/edit").get(getEditController);

module.exports = userRouter;
