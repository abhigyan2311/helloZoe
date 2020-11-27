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
                    newDevice.settings['Speed'] = 2;
                } else {
                    if(newDevice.deviceName === 'Dish Washer'){
                        newDevice.settings['Water Temperature'] = 'Hot';
                        newDevice.settings['Timer'] = 30;
                    }
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
    },

    async updateDeviceSettings(email, settingsObj){
        const filename = path.join(__dirname, "datafiles", email+ ".json");
        const data = await users.getFileAsJSON(filename);
        const devices = data.devices;
        if(settingsObj.title === 'AC'){
            for(i = 0; i < devices.length; i++){
                if(devices[i].deviceID === settingsObj.deviceID){
                    devices[i].settings.temperature = settingsObj.temperature;
                }
            }
        } else {
            if(settingsObj.title === 'TV'){
                for(i = 0; i < devices.length; i++){
                    if(devices[i].deviceID === settingsObj.deviceID){
                        devices[i].settings.Volume = settingsObj.Volume;
                        devices[i].settings.Contrast = settingsObj.Contrast;
                        devices[i].settings.Brightness = settingsObj.Brightness;
                    }
                }
            } else {
                if(settingsObj.title === 'Vaccum'){
                    for(i = 0; i < devices.length; i++){
                        if(devices[i].deviceID === settingsObj.deviceID){
                            devices[i].settings.Speed = settingsObj.Speed;
                        }
                    }
                } else {
                    if(settingsObj.title === 'Dish Washer'){
                        for(i = 0; i < devices.length; i++){
                            if(devices[i].deviceID === settingsObj.deviceID){
                                newDevice.settings['Water Temperature'] = settingsObj.WaterTemp;
                                newDevice.settings['Timer'] = settingsObj.Timer;
                            }
                        }
                    }
                }
            }
        }
        const success = await users.saveJSONToFile(filename,data);
        return success;
    }
  };
  
  module.exports = exportedMethods;
  