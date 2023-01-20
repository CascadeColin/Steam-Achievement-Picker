const router = require('express').Router();
const { feedback, user, ownedGame, achievement } = require('../models');
const sequelize = require('.././config/connection');

router.get('/achievements', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return; 
    }
    res.render('my-achievements');
});


module.exports = router; 