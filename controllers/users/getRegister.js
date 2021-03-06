const asyncHandler = require("../../middlewares/async");

exports.getRegisterController = asyncHandler(async (req, res, next) => {
	if (req.session.user) {
		return res.redirect("/");
	}
	return res.render("users/register", { title: "Register" });
});
