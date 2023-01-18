const router = require('express').Router();
const { feedback, user, ownedGame, achievement } = require('../models');
const sequelize = require('.././config/connection');

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

module.exports = router; 