const users = require("./users");
const path = require("path");

const exportedMethods = {
  async getTaskByEmail(email) {
    const filename = path.join(__dirname, "datafiles", email + "tasks.json");

    const data = await users.getFileAsJSON(filename);

    return data;
  },

  async deleteTask(email, taskID) {
    const filename = path.join(__dirname, "datafiles", email + "tasks.json");
    const data = await users.getFileAsJSON(filename);

    const taskArray = data.tasks;
    const newTaskArray = [];
    let task;
    for (task of taskArray) {
      if (task.taskID != taskID) {
        newTaskArray.push(task);
      }
    }
    data.tasks = newTaskArray;
    const success = await users.saveJSONToFile(filename, data);

    return success;
  },

  async addTask(email, newTask) {
    const filename = path.join(__dirname, "datafiles", email + "tasks.json");
    const data = await users.getFileAsJSON(filename);

    const lastTaskID = data.lastTaskID;
    newTask.taskID = lastTaskID + 1;
    data.lastTaskID = lastTaskID + 1;
    data.tasks.push(newTask);

    const success = await users.saveJSONToFile(filename, data);

    return success;
  },

  async updateTask(email, updatedTask) {
    const filename = path.join(__dirname, "datafiles", email + "tasks.json");
    const data = await users.getFileAsJSON(filename);

    const taskID = updatedTask.taskID;
    const taskArray = data.tasks;

    let task;
    for (task of taskArray) {
      if (task.taskID == taskID) {
        task.title = updatedTask.title;
        task.frequency = updatedTask.frequency;
        task.date = updatedTask.date;
        task.time = updatedTask.time;
        task.status = updatedTask.status;
      }
    }

    const success = await users.saveJSONToFile(filename, data);

    return success;
  },
};

module.exports = exportedMethods;
