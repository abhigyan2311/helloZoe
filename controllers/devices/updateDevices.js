const asyncHandler = require("../../middlewares/async");
const data = require("../../data");

const devices = data.devices;

exports.updateDevicesController = asyncHandler(async (req, res, next) => {
    if (!req.session.user) {
        return res.render("home/accessDenied", { title: "Access Denied" });
      }
    try{
        let newSettings = req.body;
        const s = await devices.updateDeviceSettings(req.session.user.email, newSettings);
        return res.redirect("/users/devices");
    }catch(e){
        return res.status(500).json({ error: e });
    }
    

});