const router = require('express').Router();
const { feedback, user, ownedGame, achievement } = require('../models');
const sequelize = require('.././config/connection');
const withAuth = require('../utils/auth');

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

router.get('/dashboard', withAuth, (req,res) => {
    res.render('dashboard', {
        loggedIn: req.session.loggedIn
    });
})

router.get('/achievements', withAuth, (req,res) => {
    res.render('my-achievements', {
        loggedIn: req.session.loggedIn
    });
})

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