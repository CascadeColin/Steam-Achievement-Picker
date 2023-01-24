const router = require("express").Router();
const { user, achievement, feedback, ownedGame } = require("../../models");
const sequelize = require("../../config/connection");
const fetch = require("node-fetch");
require("dotenv").config();
const {Op} = require('sequelize');



// get player achievements
router.get("/achievements", async (req, res) => {
  try {
    // gets steamid for the currently logged in session
    const steam_id = req.session.steamid
    // find user in db by that steamid
    const currentUser = await user.findOne({
      where: {
        steam_id: steam_id
      }
    });
    // find all games by that steam_id
    const games = await ownedGame.findAll({
      where: {
       user_id: currentUser.dataValues.id
      }
    });
    // map owned games to isolate each game_id, then format it so sequelize can use it
    const game_id_raw = games.map(game => game.dataValues.id)
    const game_id_objs = game_id_raw.map(id => {
      return {game_id: id}
    })

    // find all achievements where game_id matches a value in owned games for current user
    const achievements = await achievement.findAll({
      where: {
        [Op.or]: game_id_objs
      }
    });

    res.json(achievements);
  } catch(err) {
    console.log(err)
  }
});

// get owned games
router.get("/ownedgames", async (req, res) => {
  try {
    const steam_id = req.session.steamid;
    const currentUser = await user.findOne({
      where: {
        steam_id: steam_id
      }
    });
    console.log(currentUser.dataValues.id)
    const games = await ownedGame.findAll({
      where: {
       user_id: currentUser.dataValues.id
      }
    });
    res.json(games);
  } catch(err) {
    console.log(err)
  }
});

// get news for specific appid
router.get("/gamenews", async (req, res) => {
  fetch(
    `http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${appid}&count=3&maxlength=300&format=json`
  )
    // .then(checkStatus)
    .then((res) => res.json())
    .then((data) => res.status(200).json(data));
});

// get friends list
router.get("/friends", async (req, res) => {
  fetch(
    `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${process.env.API_KEY}&steamid=${steamid}&relationship=friend`
  )
    // .then(checkStatus)
    .then((res) => res.json())
    .then((data) => res.status(200).json(data));
});

module.exports = router;
