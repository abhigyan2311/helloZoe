const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('home/home', {
    title: 'Smart Home',
  });
});

router.post('/search', async (req, res) => {
  res.render('home/searchresult', {
    title: 'Search Result',
  });
});

module.exports = router;
