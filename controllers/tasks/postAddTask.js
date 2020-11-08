const asyncHandler = require("../../middlewares/async");
const data = require("../../data");

const tasks = data.tasks;

exports.postAddTaskController = asyncHandler(async (req, res, next) => {
  if (!req.session.user) {
    return res.render("home/accessDenied", { title: "Access Denied" });
  }

  let inputData = req.body;
  try {
    let dateto = inputData.dateto;
    if (inputData.noEndDate) {
      dateto = "";
    }

    let timeto = inputData.timeto;
    if (inputData.noEndTime) {
      timeto = "";
    }
    const date = { from: inputData.datefrom, to: dateto };
    const time = { from: inputData.timefrom, to: timeto };
    let frequency = inputData.frequency;
    if (typeof inputData.frequency == "string") {
      frequency = [frequency];
    }
    const newTask = {
      title: inputData.title,
      deviceID: inputData.deviceID,
      frequency: frequency,
      date: date,
      time: time,
      status: inputData.status,
    };

    const success = await tasks.addTask(req.session.user.email, newTask);

    return res.redirect("/tasks/manageTasks");
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});
