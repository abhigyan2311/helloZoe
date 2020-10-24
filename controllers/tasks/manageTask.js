const asyncHandler = require("../../middlewares/async.js");

exports.manageTaskController = asyncHandler(async (req, res, next) => {
	if (!req.session.user) {
		return res.render("home/accessDenied", { title: "Access Denied" });
	}

	return res.render("tasks/manageTasks", { title: "Manage Tasks" });
});
