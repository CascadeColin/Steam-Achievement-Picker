const router = require("express").Router();
const { user, achievement, feedback, ownedGame } = require("../../models");
const sequelize = require("../../config/connection");
const fetch = require("node-fetch");
require("dotenv").config();
const { Op } = require("sequelize");

router.get("/achievements", async (req, res) => {
  try {
    // gets steamid for the currently logged in session
    const steam_id = req.session.steamid;
    // find user in db by that steamid
    const currentUser = await user.findOne({
      where: {
        steam_id: steam_id,
      },
    });
    // find all games by that steam_id
    const games = await ownedGame.findAll({
      where: {
        user_id: currentUser.dataValues.id,
      },
    });
    // map owned games to isolate each game_id, then format it so sequelize can use it
    const game_id_raw = games.map((game) => game.dataValues.id);
    const game_id_objs = game_id_raw.map((id) => {
      return { game_id: id };
    });

    // find all achievements where game_id matches a value in owned games for current user
    const achievements = await achievement.findAll({
      where: {
        [Op.or]: game_id_objs,
      },
    });

    res.status(200).json(achievements);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/ownedgames", async (req, res) => {
  try {
    const steam_id = req.session.steamid;
    const currentUser = await user.findOne({
      where: {
        steam_id: steam_id,
      },
    });
    const games = await ownedGame.findAll({
      where: {
        user_id: currentUser.dataValues.id,
      },
    });
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/feedback", async (req, res) => {
  try {
    res.status(200).json(await feedback.findAll());
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO: post feedback to db
router.post("/feedback", async (req,res) => {
  try {
    const steam_id = req.session.steamid;
    const currentUser = await user.findOne({
      where: {
        steam_id: steam_id,
      },
    });
    const newComment = await feedback.create({
      //FIXME: link to corrent data once it's built in FE
      comment_body: req.body,
      // FIXME: find a way to link this
      achievement_id: 1,
      user_id: currentUser.dataValues.id
    })
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get("/single-achievement", async (req, res) => {
  try {
    const data = await achievement.findOne({
      where: {
        // something in req.body, waiting for FE code to parse it
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* These are still in development and are not part of initial launch */

// get news for specific appid
// router.get("/gamenews", async (req, res) => {});

// get friends list
// router.get("/friends", async (req, res) => {});

module.exports = router;
