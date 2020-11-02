const asyncHandler = require("../../middlewares/async");
const data = require("../../data");
const xss = require("xss");
const users = data.users;
const validators = data.validators;

exports.postUpdateProfileController = asyncHandler(async (req, res, next) => {
  if (!req.session.user) {
    res.render("home/accessDenied", { title: "Access Denied" });
    return;
  }

  const currentUser = await users.getUserByEmail(req.session.user.email);

  const { firstName, lastName, streetAddress, city, state, zipCode, country, gender, birthday, biography } = req.body;
  let birthday_date;
  if (birthday) {
    birthday_date = new Date(xss(birthday));
  } // convert string to date

  const errors = [];
  // first name and last name are required
  if (!validators.isLettersOnly(firstName)) errors.push("First name is not valid");
  if (!validators.isLettersOnly(lastName)) errors.push("Last name is not valid");
  if (birthday_date && !validators.isValidBirthday(birthday_date)) errors.push("Birthday cannot be later than today");
  if (gender && !validators.validateGender(gender)) errors.push("Please choose a gender in the given category");

  if (errors.length > 0) {
    res.status(400).render("users/editProfile", {
      user: currentUser,
      displayProfile: true,
      profileErrors: errors,
      title: "Edit Profile",
    });
  } else {
    try {
      let newAddress = {};
      if (streetAddress) newAddress.streetAddress = xss(streetAddress);
      if (city) newAddress.city = xss(city);
      if (state) newAddress.state = xss(state);
      if (zipCode) newAddress.zipCode = xss(zipCode);
      if (country) newAddress.country = xss(country);

      let userInfo = {
        firstName: xss(firstName),
        lastName: xss(lastName),
        gender: xss(gender),
        biography: xss(biography),
        birthday: birthday_date,
        address: newAddress,
      };

      const updatedUser = await users.updateUser(req.session.user.email, userInfo);
      req.session.user = {
        _id: updatedUser._id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      };
      res.render("users/updateSuccess", { content: "profile", title: "Profile Update Success" });
    } catch (e) {
      res.status(500).render("users/editProfile", {
        user: currentUser,
        displayProfile: true,
        profileErrors: [e],
        title: "Edit Profile",
      });
    }
  }
});
