const bluebird = require("bluebird");
const fs = bluebird.promisifyAll(require("fs"));
const path = require("path");

function checkInput(val, type, variableName) {
  if (val === undefined) {
    throw `${variableName} is not defined, please provide a valid ${variableName}`;
  }

  if (typeof val !== type) {
    throw `${variableName} is not a/an ${type}, please provide a valid type input`;
  }

  // check empty string
  if (type === "string" && !val) {
    throw `${variableName} is empty string!`;
  }
}

async function saveJSONToFile(path, obj) {
  checkInput(path, "string", "path");
  checkInput(obj, "object", "object");

  // for context of Lab 3, we expect a non-array object to be saved
  if (Array.isArray(obj)) {
    throw "Please provide non-array object";
  }

  if (obj === null) {
    throw "The given object is null";
  }

  if (Object.keys(obj).length === 0) {
    throw "The object is empty, please check";
  }

  let JSON_string = JSON.stringify(obj);
  await fs.writeFileAsync(path, JSON_string);
  console.log(`Successfully write the result to ${path}!`);
  return true;
}

async function saveJSONToFile(path, obj) {
  checkInput(path, "string", "path");
  checkInput(obj, "object", "object");

  // for context of Lab 3, we expect a non-array object to be saved
  if (Array.isArray(obj)) {
    throw "Please provide non-array object";
  }

  if (obj === null) {
    throw "The given object is null";
  }

  if (Object.keys(obj).length === 0) {
    throw "The object is empty, please check";
  }

  let JSON_string = JSON.stringify(obj);
  await fs.writeFileAsync(path, JSON_string);
  console.log(`Successfully write the result to ${path}!`);
  return true;
}

async function getFileAsJSON(path) {
  checkInput(path, "string", "path");
  console.log(`Trying to read content from ${path} ...`);
  let fileContent = await fs.readFileAsync(path, "utf-8");
  if (!fileContent) {
    throw `There is no content in ${path}`;
  }
  let object_result = JSON.parse(fileContent);
  // check if parsed result is an object
  checkInput(object_result, "object", "pre-saved result");
  if (Array.isArray(object_result)) {
    throw `Result in ${path} is an array, expecting non-array object, please try to generate result again.`;
  }

  if (object_result == null) {
    throw `Result in ${path} is null, expecting non-array object, please try to generate result again.`;
  }

  if (Object.keys(object_result).length === 0) {
    throw `Result in ${path} is {}, please try to generate result again.`;
  }

  console.log(`Successfully get object result from ${path}!`);
  return object_result;
}

const exportedMethods = {
  async getUserByEmail(email) {
    const filename = path.join(__dirname, "datafiles", email + ".json");

    const data = await getFileAsJSON(filename);

    return data;
  },

  async createUser(data) {
    // TBD, discuss where to store new data
    const filename = path.join(__dirname, "datafiles", data.email + ".json");
    const success = await saveJSONToFile(filename, data);
    return success;
  },

  async updateUser(email, newUserInfo) {
    let currentUserData = await this.getUserByEmail(email);
    for (let key in newUserInfo) {
      currentUserData[key] = newUserInfo[key];
    }
    const filename = path.join(__dirname, "datafiles", email + ".json");
    const success = await saveJSONToFile(filename, currentUserData);
    if (!success) throw "Update Failed";
    const updatedUser = await this.getUserByEmail(email);
    return updatedUser;
  },
  getFileAsJSON,
  saveJSONToFile,
};

module.exports = exportedMethods;
