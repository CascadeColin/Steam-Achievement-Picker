const router = require('express').Router();
const { feedback, user, ownedGame, achievement } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('.././config/connection');

router.get('/achievements', (req, res) => {
    res.render('my-achievements');
});

router.get('/achievementpicker', (req, res) => {
    res.render('achievement-picker');
});

module.exports = router; 