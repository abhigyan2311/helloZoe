const asyncHandler = require("../../middlewares/async");
const data = require("../../data");

const users = data.users;

exports.getDeviceController = asyncHandler(async (req, res, next) => {
  if (!req.session.user) {
    return res.render("home/accessDenied", { title: "Access Denied" });
  }

  const deviceID = req.params.deviceID;
  const userData = await users.getUserByEmail(req.session.user.email);

  const allDevices = userData.devices; // array of devices
  for (let i = 0; i < allDevices.length; i++) {
      if (allDevices[i].deviceID == deviceID) {
        return res.render("devices/singleDevice", { title: deviceID, device: allDevices[i] });
	  }
  }
});
