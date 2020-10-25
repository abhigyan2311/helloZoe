const asyncHandler = require("../../middlewares/async");
const data = require("../../data");
const users = data.users;

exports.homeController = asyncHandler(async (req, res, next) => {
	if (!req.session.user) {
		return res.render("home/homePublic", { title: "Home Page" });
	} else {
		const userData = await users.getUserByEmail(req.session.user.email);
		return res.render("home/home", { user: userData, title: "Home Dashboard" });
	}
});
