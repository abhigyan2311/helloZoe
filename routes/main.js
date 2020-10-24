const express = require("express");

const homeRouter = require("../controllers/home/router");
const userRouter = require("../controllers/users/router");
const taskRouter = require("../controllers/tasks/router");
const roomRouter = require("../controllers/rooms/router");

// Initialize router
const router = express.Router();

router.use("/", homeRouter);
router.use("/home", homeRouter);
router.use("/users", userRouter);
router.use("/room", roomRouter);
router.use("/tasks", taskRouter);

module.exports = router;

users / profile;
