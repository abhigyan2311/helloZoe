const asyncHandler = require("../../middlewares/async.js");
const data = require("../../data");
const users = data.users;

exports.roomController = asyncHandler(async (req, res, next) => {
	if (!req.session.user) {
		return res.render("home/accessDenied", { title: "Access Denied" });
	}

	const roomname = req.params.roomname;
	const userData = await users.getUserByEmail(req.session.user.email);
	const allDevices = userData.devices;
	let roomDevices = [];
	for (let i = 0; i < allDevices.length; i++) {
		if (allDevices[i].room == roomname) {
			roomDevices.push(allDevices[i]);
		}
	}
	return res.render("room/singleRoom", { roomName: roomname, roomDevices: roomDevices, title: roomname });
});
