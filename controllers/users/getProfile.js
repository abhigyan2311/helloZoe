const asyncHandler = require("../../middlewares/async");
const data = require("../../data");
const users = data.users;

exports.getProfileController = asyncHandler(async (req, res, next) => {
	if (!req.session.user) {
		return res.render("home/accessDenied", { title: "Access Denied" });
	}
	const userData = await users.getUserByEmail(req.session.user.email);
	return res.render("users/profile", { user: userData, title: "Profile" });
});
