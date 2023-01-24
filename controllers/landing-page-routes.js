const router = require("express").Router();
const { feedback, user, ownedGame, achievement } = require("../models");
const sequelize = require(".././config/connection");
const withAuth = require("../utils/auth");
const {Op} = require('sequelize');

router.get("/", async(req, res) => {
  res.render("landing-page", {
    loggedIn: req.session.loggedIn,
  });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
  }
  res.render("login");
});

router.get("/dashboard", withAuth, (req, res) => {
  res.render("dashboard", {
    loggedIn: req.session.loggedIn,
  });
});

router.get("/achievements", withAuth, async (req, res) => {
  const User = await user.findOne({
    where: {
      steam_id: req.session.steamid
    }
  });

  const games = await ownedGame.findAll({
    where: {
      user_id: User.dataValues.id
    }
  })

  const game_ids = games.map(game => {
    return {game_id: game.dataValues.id}
  })

  const achs = await achievement.findAll({
    where: {
      achieved: 1,
      [Op.or]: game_ids
    }
  })
  const renderAchievements = achs.map(a => {
    return a = a.dataValues;
  })
  
  console.dir(renderAchievements)
  res.render("all-achievements", {
    renderAchievements,
    loggedIn: req.session.loggedIn,
  });
});

router.get("/achievement-picker", withAuth, (req, res) => {
  res.render("achievement-picker", {
    loggedIn: req.session.loggedIn,
  });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/single-achievement", (req,res) => {
  res.render("single-achievement", {
    loggedIn: req.session.loggedIn,
  });
});

// if any other route typed in URL, render homepage

// router.get("*", (req, res) => {
//   if (req.session.loggedIn) {
//     res.render("dashboard", {
//       loggedIn: req.session.loggedIn,
//     });
//   } else {
//     res.render("landing-page");
//   }
// });

module.exports = router;
