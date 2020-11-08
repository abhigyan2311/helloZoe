const asyncHandler = require("../../middlewares/async");
const data = require("../../data");

const users = data.users;
const tasks = data.tasks;
const validators = data.validators;

exports.editTaskController = asyncHandler(async (req, res, next) => {
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
    if (typeof frequency == "string") {
      frequency = [frequency];
    }

    const updateTask = {
      title: inputData.title,
      frequency: frequency,
      date: date,
      time: time,
      status: inputData.status,
      taskID: inputData.taskID,
    };

    const success = await tasks.updateTask(req.session.user.email, updateTask);

    return res.redirect("/tasks/manageTasks");
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});
