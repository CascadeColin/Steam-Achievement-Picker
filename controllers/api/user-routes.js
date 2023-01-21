const router = require("express").Router();
const { user, ownedGame, achievement, } = require("../../models");
const sequelize = require("../../config/connection");
const fetch = require("node-fetch");
require("dotenv").config();

// CREATE new user
router.post("/signup", async (req, res) => {
  try {
    const dbUserData = await user.create({
      email: req.body.email,
      password: req.body.password,
      steam_id: req.body.steamid,
    });

    /* take user data and fetch ownedgames and achievements, then store in db */

    // fetch owned games by provided steamid
    const dbGameData = await fetch(
      "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" +
        process.env.API_KEY +
        "&steamid=" +
        req.body.steamid +
        "&format=json&include_appinfo=true&"
    )
      .then((res) => res.json())
      .then((data) => data);

    // destructure response to access games array
    const { response } = dbGameData;
    const { games } = response;

    // remove unused parts of the objects within games array, returning a new array seedData
    const seedData = games.map((game) => {
      delete game.playtime_forever;
      delete game.has_community_visible_stats;
      delete game.playtime_windows_forever;
      delete game.playtime_mac_forever;
      delete game.playtime_linux_forever;
      delete game.rtime_last_played;
      return game;
    });

    console.dir(seedData);

    // get user_id of the user we just created
    const userId = await user.findOne({
      where: {
        email: req.body.email
      }
    });
    const {id} = userId;

    // then seed that game data into db using seedData
    // link to user by "find user where email=req.body.email" to get newly created user
    for (const game of seedData) {
      await ownedGame.create({
        ...game,
        user_id: id
      });
    }

    // set logged in state to true and save to session cookie
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
