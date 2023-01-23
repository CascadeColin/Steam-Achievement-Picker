const router = require("express").Router();
const { user, ownedGame, achievement } = require("../../models");
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

    /* start ownedGame autoseeding */

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
    // can re-integrate this data later on by removing its delete command here and updating the ownedGame model to include a column for it
    const seedData = games.map((game) => {
      delete game.playtime_forever;
      delete game.has_community_visible_stats;
      delete game.playtime_windows_forever;
      delete game.playtime_mac_forever;
      delete game.playtime_linux_forever;
      delete game.rtime_last_played;
      return game;
    });

    // get user_id of the user we just created
    const userId = await user.findOne({
      where: {
        email: req.body.email,
      },
    });
    const { id } = userId;

    // then seed that game data into db using seedData
    // link to user by "find user where email=req.body.email" to get newly created user
    for (const game of seedData) {
      await ownedGame.create({
        ...game,
        user_id: id,
      });
    }
    /* end of ownedGame autoseeding */
    /* start achievements autoseeding */
    // FIXME:  currently does not work, but it shouldn't break the server.  will work on this when i get home later tonight - Colin

    //get appid for each ownedGame by newly created user id
    const arrayOfClasses = await ownedGame.findAll({
      where: {
        user_id: id,
      },
    });

    // map over the array of sequelize objects to get appid for each game
    // TODO: appidArr is an array that contains the appids as primitive values
    const appidArr = arrayOfClasses.map((games) => games.dataValues.appid);

    // for each appid, fetch GetPlayerAchievements && create db entries in achievements table

    // declared in this scope for manipulation in multiple loops
    const achievementsArr = [];

    for (const appid of appidArr) {
      await fetch(
        `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${process.env.API_KEY}&steamid=${req.body.steamid}`
      )
        .then((res) => res.json())
        .then((data) => {
          data.playerstats.appid = appid;
          // data.playerstats.achievements.map(obj => obj.appid = appid);
          achievementsArr.push(data);
        });
    }

    // store appid in each achievement obj for each game
    for (const game of achievementsArr) {
      // if game has no achievements, create a single "achievement" that can be called in the front end to indicate that the game doesn't have achievements
      if (!game.playerstats.success) {
        // get ownedGame sequelize object that matches appid of game
        const game_id_obj = await ownedGame.findOne({
          where: {
            appid: game.playerstats.appid
          }
        });
        // store game_id of sequelize object- this is achievement table foreign key
        const game_id = game_id_obj.dataValues.id;
        // create achievement sequelize object for every game that doesn't have achievements
        await achievement.create({
          ...game,
          name: "Requested game has no achievements!",
          achieved: 0,
          unlock_time: 0,
          game_id: game_id
        });
      }
      // for games that do have achievements.  games that don't will be handled in front end code (if db data = null, return "no achievements found")
      else if (game.playerstats.success) {
        // store appid so it can be copied into each achievement object
        const copyAppid = game.playerstats.appid;
        // map appid as a property of each achievement object
        game.playerstats.achievements.map(obj => obj.appid = copyAppid);
      }
    }
    // console.dir(achievementsArr)

    // for each achievement for each game, create a new entry in achievement table of db
    
    // create a single "achievement" that can be called in the front end to indicate that the game doesn't have achievements

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
