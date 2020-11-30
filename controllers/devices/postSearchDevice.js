const asyncHandler = require("../../middlewares/async");
const data = require("../../data");
const users = data.users;

exports.postSearchDevicesController = asyncHandler(async (req, res, next) => {
  if (!req.session.user) {
    return res.render("home/accessDenied", { title: "Access Denied" });
  }
  try {
    const searchTerm = req.body.searchTerm.toLowerCase();

    const userData = await users.getUserByEmail(req.session.user.email);
    const allDevices = userData.devices;

    let devicesByRooms = {};

    for (device of allDevices) {
      let deviceString = JSON.stringify(device).toLowerCase();
      let match = deviceString.includes(searchTerm);
      if (!match) {
        continue;
      }

      if (!devicesByRooms[device.room]) {
        devicesByRooms[device.room] = [device];
      } else {
        devicesByRooms[device.room].push(device);
      }
    }

    let devicesByRoomArray = [];
    for (let key in devicesByRooms) {
      let newObj = {};
      newObj["room"] = key;
      newObj["devices"] = devicesByRooms[key];
      devicesByRoomArray.push(newObj);
    }
    return res.render("users/devices", { title: "All Devices", devicesByRoomArray: devicesByRoomArray });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});
