const asyncHandler = require("../../middlewares/async");

exports.getLoginController = asyncHandler(async (req, res, next) => {
	if (req.session.user) {
		res.redirect("/");
	}
	return res.render("users/login", { title: "Login" });
});
