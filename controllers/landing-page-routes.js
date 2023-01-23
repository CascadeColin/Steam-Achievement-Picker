const router = require('express').Router();
const { feedback, user, ownedGame, achievement } = require('../models');
const sequelize = require('.././config/connection');
const fetch = require("node-fetch");

router.get('/', (req, res) => {
    res.render('landing-page');
})

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return; 
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

router.get('/achievementpicker', (req, res) => {
    res.render('achievement-picker');
});

router.get('/achievements', (req, res) => {
    res.render('my-achievements');
});

module.exports = router; 