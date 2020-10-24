const asyncHandler = require("../../middlewares/async");

exports.getDevicesController = asyncHandler(async (req, res, next) => {
	if (req.session.user) {
		return res.redirect("/");
	}
	return res.render("users/devices", { title: "All Devices" });
});
