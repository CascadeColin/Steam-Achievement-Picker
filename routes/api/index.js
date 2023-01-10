const router = require('express').Router();

const achievementRoutes = require('./achievements');

router.use('/achievements', achievementRoutes);

module.exports = router;
