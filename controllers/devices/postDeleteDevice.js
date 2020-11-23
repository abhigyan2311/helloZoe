const asyncHandler = require("../../middlewares/async");
const data = require("../../data");

const users = data.users;
const devices = data.devices;

exports.postDeleteDevicesController = asyncHandler(async (req, res, next) => {
  if (!req.session.user) {
    return res.render("home/accessDenied", { title: "Access Denied" });
  }

  const success = await devices.deleteDevice(req.session.user.email, req.params.deviceID);

  return res.redirect("/users/devices");
});
