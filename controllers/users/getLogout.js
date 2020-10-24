const asyncHandler = require("../../middlewares/async");

exports.getLogoutController = asyncHandler(async (req, res, next) => {
	req.session.destroy();
	return res.render("users/logout", { title: "Logging out" });
});
