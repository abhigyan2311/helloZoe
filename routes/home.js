const express = require('express');
const router = express.Router();
const data = require('../data');
const users = data.users;

router.get('/', async (req, res) => {
  if (!req.session.user) {
    // if user not login yet, show a general page
    res.render('home/homePublic', { title: 'Home Page' });
  } else {
    const userData = await users.getUserByEmail(req.session.user.email);
    res.render('home/home', { user: userData, title: 'Smart Home' });
  }
});

module.exports = router;
