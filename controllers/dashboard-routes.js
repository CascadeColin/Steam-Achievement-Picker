const router = require('express').Router();
const { feedback, user, ownedGame, achievement } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('.././config/connection');

router.get('/achievements',withAuth, (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return; 
    }
    res.render('my-achievements');
});


module.exports = router; 