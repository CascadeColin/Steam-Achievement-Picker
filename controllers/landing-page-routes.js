const router = require('express').Router();
const { feedback, user, ownedGame, achievement } = require('../models');
const sequelize = require('.././config/connection');

router.get('/', (req, res) => {
    res.render('landing-page', {
        loggedIn: req.session.loggedIn
    });
})

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/dashboard');
        return; 
    }
    res.render('login');
});

router.get('/dashboard', (req,res) => {
    res.render('dashboard');
})



router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router; 