const asyncHandler = require("../../middlewares/async");
const data = require("../../data");

const users = data.users;

exports.getAddDevicesController = asyncHandler(async (req, res, next) => {
  if (!req.session.user) {
    return res.render("home/accessDenied", { title: "Access Denied" });
  }

  const userData = await users.getUserByEmail(req.session.user.email);

  const rooms = userData.rooms; // array of devices

  return res.render("devices/addDevices", { title: "Add Device", rooms: rooms });
});
