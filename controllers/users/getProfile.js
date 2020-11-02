const asyncHandler = require('../../middlewares/async');
const data = require('../../data');
const users = data.users;

exports.getProfileController = asyncHandler(async (req, res, next) => {
  if (!req.session.user) {
    return res.render('home/accessDenied', { title: 'Access Denied' });
  }
  const userData = await users.getUserByEmail(req.session.user.email);
  const allDevices = userData.devices;
  let devicesByRooms = {};

  for (device of allDevices) {
    if (!devicesByRooms[device.room]) {
      devicesByRooms[device.room] = [device];
    } else {
      devicesByRooms[device.room].push(device);
    }
  }

  let devicesByRoomArray = [];
  for (let key in devicesByRooms) {
    let newObj = {};
    newObj['room'] = key;
    newObj['devices'] = devicesByRooms[key];
    devicesByRoomArray.push(newObj);
  }

  return res.render('users/profile', { user: userData, title: 'Profile', devicesByRoomArray: devicesByRoomArray });
});
