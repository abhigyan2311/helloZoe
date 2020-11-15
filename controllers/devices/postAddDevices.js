const asyncHandler = require("../../middlewares/async");
const data = require("../../data");

const devices = data.devices;

exports.postAddDevicesController = asyncHandler(async (req, res, next) => {
  if (!req.session.user) {
    return res.render("home/accessDenied", { title: "Access Denied" });
  }

  let newDeviceInfo = req.body;
  try {
    let deviceName = newDeviceInfo.deviceName;
    if (!newDeviceInfo.deviceName) {
      deviceName = "";
    }

    let roomSelection = newDeviceInfo.roomSelection;
    if (!newDeviceInfo.roomSelection) {
      roomSelection = "";
    }

    let tags = newDeviceInfo.tags;
    if (typeof newDeviceInfo.tags == "string") {
      tags = [tags];
    }
    
    const newDevice = {
      deviceID: "",
      deviceName: deviceName,
      settings: {},
      room: roomSelection,
      icon: "",
      tags: tags
    };

    const success = await devices.addDevice(req.session.user.email, newDevice);

    return res.redirect("/users/devices");
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});
