const asyncHandler = require("../../middlewares/async");
const data = require("../../data");

const users = data.users;
const tasks = data.tasks;

exports.postDeleteTaskController = asyncHandler(async (req, res, next) => {
  if (!req.session.user) {
    return res.render("home/accessDenied", { title: "Access Denied" });
  }

  const success = await tasks.deleteTask(req.session.user.email, req.params.id);

  return res.redirect("/tasks/manageTasks");
});
