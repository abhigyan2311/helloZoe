const asyncHandler = require("../../middlewares/async");
const data = require("../../data");
const tasks = data.tasks;
const users = data.users;

exports.manageTaskController = asyncHandler(async (req, res, next) => {
  if (!req.session.user) {
    return res.render("home/accessDenied", { title: "Access Denied" });
  }
  const taskData = await tasks.getTaskByEmail(req.session.user.email);
  const userData = await users.getUserByEmail(req.session.user.email);
  const taskArray = taskData.tasks; // the array of tasks
  const devices = userData.devices; // array of devices

  // get device name for each device ID
  let deviceDict = {};
  let device;
  for (device of devices) {
    deviceDict[device.deviceID] = device.room + device.deviceName;
  }

  let task;
  for (task of taskArray) {
    const deviceID = task.deviceID;
    task.deviceName = deviceDict[deviceID];
  }

  return res.render("tasks/manageTasks", { title: "Manage Tasks", tasks: taskArray });
});
