const express = require('express');
const router = express.Router();
const data = require('../data');
const users = data.users;

router.get('/:roomname', async (req, res) => {
  if (!req.session.user) {
    res.render('home/accessDenied', { title: 'Access Denied' });
    return;
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
  res.render('room/singleRoom', { roomName: roomname, roomDevices: roomDevices, title: roomname });
});

module.exports = router;
