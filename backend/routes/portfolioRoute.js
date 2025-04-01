const express = require('express');
const { getMediumFeed } = require('../controllers/portfolioController');

const router = express.Router();

router.get('/blogs', getMediumFeed);

module.exports = router;
