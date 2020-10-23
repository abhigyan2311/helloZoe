const bcrypt = require("bcrypt");
const asyncHandler = require("../../middlewares/async");
const data = require("../../data");

const users = data.users;
const validators = data.validators;

exports.postRegisterController = asyncHandler(async (req, res, next) => {
	const errors = [];
	const { firstName, lastName, gender, email, password, passwordConfirm } = req.body;
	if (!validators.isLettersOnly(firstName)) errors.push("First name is missing");
	if (!validators.isLettersOnly(lastName)) errors.push("Last name is missing");
	if (!validators.isNonEmptyString(gender)) errors.push("Gender is missing");
	else if (!validators.validateGender(gender)) errors.push("Gender provided is invalid");
	if (!validators.isNonEmptyString(email)) errors.push("Email address is missing");
	else if (!validators.isValidEmail(email)) errors.push("The provided emails is incorrect");
	if (!validators.isNonEmptyString(password)) errors.push("Password is missing");
	else if (!validators.isValidPassword(password)) errors.push("Password must be at least of length 8");
	if (!validators.isNonEmptyString(passwordConfirm)) errors.push("Password confirmation is missing");
	if (password !== passwordConfirm) errors.push("Password and confirmation don't match");

	const hashedPassword = await bcrypt.hash(password, 10);
	let user = {
		firstName: xss(firstName),
		lastName: xss(lastName),
		email: xss(email.toLowerCase()),
		hashedPassword,
		gender: xss(gender),
	};

	if (errors.length > 0) {
		return res.status(400).render("users/register", { errors, user, title: "Register" });
	} else {
		try {
			const existingUser = await users.getUserByEmail(email.toLowerCase());
			if (existingUser) {
				return res.status(400).render("users/register", { errors: ["This email address is already used."], user, title: "Register" });
			} else {
				user = await users.createUser(user);
				return res.render("users/reg_success", { user, title: "Register Success" });
			}
		} catch (e) {
			return res.status(500).render("users/register", { errors: [e], user, title: "Register" });
		}
	}
});
