const express = require("express");
const router = express.Router();
const data = require("../data");
const userd = data.users;

router.get("/managetasks", async (req, res) => {
  if (!req.session.user) {
    res.render("home/accessDenied", { title: "Access Denied" });
    return;
  }

  res.render("tasks/manageTasks", { title: "Manage Tasks" });
});

router.post("/newTask", async (req, res) => {
  let taskToAdd = req.body;
  user = req.session.user;

  try {
    const newTask = {
      title: taskToAdd.taskName,
      device: taskToAdd.deviceName,
      date: taskToAdd.date,
      time: taskToAdd.time,
    };

    userd.saveJSONToFile(
      `/Users/pratikdeo/Documents/helloZoe/data/datafiles/${user.email}tasks.json`,
      newTask
    );
    res.render("tasks/manageTasks");
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/addTasks", async (req, res) => {
  if (!req.session.user) {
    res.render("home/accessDenied", { title: "Access Denied" });
    return;
  }

  res.render("tasks/addTasks", { title: "Add Tasks" });
});

module.exports = router;
