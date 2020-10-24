const asyncHandler = require("../../middlewares/async.js");

exports.newTaskController = asyncHandler(async (req, res, next) => {
	let taskToAdd = req.body;
	user = req.session.user;

	try {
		const newTask = {
			title: taskToAdd.taskName,
			device: taskToAdd.deviceName,
			date: taskToAdd.date,
			time: taskToAdd.time,
		};

		userd.saveJSONToFile(`/Users/pratikdeo/Documents/helloZoe/data/datafiles/${user.email}tasks.json`, newTask);
		return res.render("tasks/manageTasks");
	} catch (e) {
		return res.status(500).json({ error: e });
	}
});
