const users = require("./users");
const path = require("path");

const exportedMethods = {
    async addDevice(email, newDevice) {
        const filename = path.join(__dirname, "datafiles", email+ ".json");
        const data = await users.getFileAsJSON(filename);

        //To get the last deviceID
        const devices = data.devices;
        const lastDeviceID = devices[devices.length-1].deviceID.split("device").join("");
        const newDeviceID = parseInt(lastDeviceID) + 1;
        newDevice.deviceID = `device${newDeviceID}`;
        console.log(newDevice);
        if(newDevice.deviceName === 'AC'){
            newDevice.settings['temperature'] = 0;
        }else {
            if(newDevice.deviceName === 'TV'){
                newDevice.settings['Volume'] = 50;
                newDevice.settings['Contrast'] = 50;
                newDevice.settings['Brightness'] = 75;
            } else {
                if(newDevice.deviceName === 'Vaccum'){
                    newDevice.settings['Spped'] = 2;
                }
            }
        }
        data.devices.push(newDevice);

        const success = await users.saveJSONToFile(filename, data);

        return success;
    },

    async deleteDevice(email, deviceID) {
        const filename = path.join(__dirname, "datafiles", email+ ".json");
        const data = await users.getFileAsJSON(filename);

        const devices = data.devices;
        const newDeviceArray = [];
        for (device of devices) {
            if (device.deviceID != deviceID) {
                newDeviceArray.push(device);
            }
        }
        data.devices = newDeviceArray;
        const success = await users.saveJSONToFile(filename, data);

        return success;
    }
  };
  
  module.exports = exportedMethods;
  