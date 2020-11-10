const asyncHandler = require("../../middlewares/async");
const data = require('../../data');
const users = data.users;

exports.getDevicesController = asyncHandler(async (req, res, next) => {
	// if (req.session.user) {
	// 	return res.redirect("/");
	// }
	// return res.render("users/devices", { title: "All Devices" });
	
  if (!req.session.user) {
    return res.render('home/accessDenied', { title: 'Access Denied' });
  }
  const userData = await users.getUserByEmail(req.session.user.email);
  const allDevices = userData.devices;

  return res.render("users/devices", { title: "All Devices", allDevices: allDevices});
});
