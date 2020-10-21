const express = require("express");
const router = express.Router();
const data = require("../data");

router.get("/managetasks", async (req, res) => {
  if (!req.session.user) {
    res.render("home/accessDenied", { title: "Access Denied" });
    return;
  }

  res.render("tasks/manageTasks", { title: "Manage Tasks" });
});

module.exports = router;
