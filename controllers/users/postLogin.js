const bcrypt = require("bcrypt");
const asyncHandler = require("../../middlewares/async");
const data = require("../../data");

const users = data.users;
const validators = data.validators;

exports.postLoginController = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;
	const errors = [];
	if (!validators.isNonEmptyString(email)) errors.push("Email address is missing");
	if (!validators.isNonEmptyString(password)) errors.push("Password is missing");

	if (errors.length > 0) {
		return res.status(400).render("users/login", { errors, email, title: "Login" });
	} else {
		const user = await users.getUserByEmail(email.toLowerCase());
		if (user && (await bcrypt.compare(password, user.hashedPassword))) {
			req.session.user = { _id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName };
			return res.redirect("/");
		} else {
			return res.status(400).render("users/login", { errors: ["Email or Password is incorrect"], email, title: "Login" });
		}
	}
});
