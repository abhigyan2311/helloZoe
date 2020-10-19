const express = require('express');
const router = express.Router();
const data = require('../data');
const users = data.users;
const validators = data.validators;
const xss = require('xss');
const bcrypt = require('bcrypt');

router.get('/register', async (req, res) => {
  if (req.session.user) {
    res.redirect('/');
  }
  res.render('users/register', { title: 'Register' });
});

router.post('/register', async (req, res) => {
  const errors = [];
  const { firstName, lastName, gender, email, password, passwordConfirm } = req.body;
  if (!validators.isLettersOnly(firstName)) errors.push('First name is missing');
  if (!validators.isLettersOnly(lastName)) errors.push('Last name is missing');
  if (!validators.isNonEmptyString(gender)) errors.push('Gender is missing');
  else if (!validators.validateGender(gender)) errors.push('Gender provided is invalid');
  if (!validators.isNonEmptyString(email)) errors.push('Email address is missing');
  else if (!validators.isValidEmail(email)) errors.push('The provided emails is incorrect');
  if (!validators.isNonEmptyString(password)) errors.push('Password is missing');
  else if (!validators.isValidPassword(password)) errors.push('Password must be at least of length 8');
  if (!validators.isNonEmptyString(passwordConfirm)) errors.push('Password confirmation is missing');
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
    res.status(400).render('users/register', { errors, user, title: 'Register' });
  } else {
    try {
      const existingUser = await users.getUserByEmail(email.toLowerCase());
      if (existingUser) {
        res
          .status(400)
          .render('users/register', { errors: ['This email address is already used.'], user, title: 'Register' });
      } else {
        user = await users.createUser(user);
        res.render('users/reg_success', { user, title: 'Register Success' });
      }
    } catch (e) {
      res.status(500).render('users/register', { errors: [e], user, title: 'Register' });
    }
  }
});

router.get('/login', async (req, res) => {
  if (req.session.user) {
    res.redirect('/');
  }
  res.render('users/login', { title: 'Login' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const errors = [];
  if (!validators.isNonEmptyString(email)) errors.push('Email address is missing');
  if (!validators.isNonEmptyString(password)) errors.push('Password is missing');

  if (errors.length > 0) {
    res.status(400).render('users/login', { errors, email, title: 'Login' });
  } else {
    const user = await users.getUserByEmail(email.toLowerCase());
    if (user && (await bcrypt.compare(password, user.hashedPassword))) {
      req.session.user = { _id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName };
      res.redirect('/');
    } else {
      res.status(400).render('users/login', { errors: ['Email or Password is incorrect'], email, title: 'Login' });
    }
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();

  res.render('users/logout', { title: 'Logging out' });
});

router.get('/devices', async (req, res) => {
  res.render('users/devices', { title: 'All Devices' });
});

router.get('/profile', async (req, res) => {
  if (!req.session.user) {
    res.render('home/accessDenied', { title: 'Access Denied' });
    return;
  }
  const userData = await users.getUserByEmail(req.session.user.email);
  res.render('users/profile', { user: userData, title: 'Profile' });
});

router.get('/edit', async (req, res) => {
  if (!req.session.user) {
    res.render('home/accessDenied', { title: 'Access Denied' });
    return;
  }

  const userData = await users.getUserByEmail(req.session.user.email);
  res.render('users/editProfile', {
    user: userData,
    title: 'Edit Profile',
    displayProfile: true,
  });
});

module.exports = router;
