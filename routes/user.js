const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('user/user', {
    title: 'User',
  });
});

module.exports = router;
