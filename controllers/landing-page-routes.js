const router = require("express").Router();
const { feedback, user, ownedGame, achievement } = require("../models");
const sequelize = require(".././config/connection");
const withAuth = require("../utils/auth");
const {Op} = require('sequelize');
const shuffle = require('../utils/shuffle');

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

router.get("/dashboard", withAuth, async (req, res) => {
  const steam_id = req.session.steamid;
  // find user in db by that steamid
  const currentUser = await user.findOne({
    where: {
      steam_id: steam_id,
    },
  });

  const pickGame = await ownedGame.findAll({
    where: {
      user_id: currentUser.dataValues.id
    }
  });

  const randomGame = shuffle(pickGame);

  const randomGames = {
    game1: randomGame[0].dataValues.name,
    game2: randomGame[1].dataValues.name,
    game3: randomGame[2].dataValues.name,
    game4: randomGame[3].dataValues.name,
    game1url: `https://media.steampowered.com/steamcommunity/public/images/apps/${randomGame[0].dataValues.appid}/${randomGame[0].dataValues.img_icon_url}.jpg`,
    game2url: `https://media.steampowered.com/steamcommunity/public/images/apps/${randomGame[1].dataValues.appid}/${randomGame[1].dataValues.img_icon_url}.jpg`,
    game3url: `https://media.steampowered.com/steamcommunity/public/images/apps/${randomGame[2].dataValues.appid}/${randomGame[2].dataValues.img_icon_url}.jpg`,
    game4url: `https://media.steampowered.com/steamcommunity/public/images/apps/${randomGame[3].dataValues.appid}/${randomGame[3].dataValues.img_icon_url}.jpg`,
    game1appid: randomGame[0].dataValues.appid,
    game2appid: randomGame[1].dataValues.appid,
    game3appid: randomGame[2].dataValues.appid,
    game4appid: randomGame[3].dataValues.appid,
  }

  res.render("dashboard", {
    randomGames,
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
    return {
      // name: game.dataValues.name,
      game_id: game.dataValues.id
    }
  })

  const getGameNames = games.map(game => {
    return {
      name: game.dataValues.name,
      game_id: game.dataValues.id,
      url: game.dataValues.img_icon_url,
      appid: game.dataValues.appid
    }
  })

  const achs = await achievement.findAll({
    where: {
      achieved: 1,
      [Op.or]: game_ids
    }
  })
  
  const renderAchievementsUnsliced = achs.map(a => {
    return a = a.dataValues;
  })

  // shuffle the array, then slice to get the first 5
  shuffle(renderAchievementsUnsliced);
  const renderAchievement = renderAchievementsUnsliced.slice(0,5);

  const renderAchievements = renderAchievement.map(a => {
    for (const obj of getGameNames) {
      if (a.game_id === obj.game_id) {
        a.gamename = obj.name;
        a.url = `https://media.steampowered.com/steamcommunity/public/images/apps/${obj.appid}/${obj.url}.jpg`;
      }
    }
    return a;
  });
console.log(renderAchievements)
  res.render("all-achievements", {
    renderAchievements,
    loggedIn: req.session.loggedIn,
  });
});

router.get('/achievement-picker/:appid', withAuth, async (req,res) => {
  try {
    const game = await ownedGame.findOne({
      where: {
        appid: req.params.appid
      }
    });
    const searchAchievements = await achievement.findAll({
      where: {
        game_id: game.dataValues.id
      }
    });
    const aNameArr = shuffle(searchAchievements.map(a => a.dataValues.name));

    const randomAchievement = {
      gName: game.dataValues.name,
      aName: aNameArr[0]
    }
    console.log(randomAchievement)
    res.status(200).render("achievement-picker", {
      randomAchievement,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get("/random-achievement-picker", withAuth, async (req, res) => {
  const steam_id = req.session.steamid;
    // find user in db by that steamid
  const currentUser = await user.findOne({
    where: {
      steam_id: steam_id,
    },
  });

  const pickGame = await ownedGame.findAll({
    where: {
      user_id: currentUser.dataValues.id
    }
  });
  
  const randomGame = shuffle(pickGame);
  const pickAchievement = await achievement.findAll({
    where: {
      game_id: randomGame[0].dataValues.id
    }
  });
  const randomAch = shuffle(pickAchievement);

  const randomAchievement = {
    aName: randomAch[0].dataValues.name,
    gName: randomGame[0].dataValues.name
  }
  
  res.render("achievement-picker", {
    randomAchievement,
    loggedIn: req.session.loggedIn,
  });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/single-achievement/:id", async (req, res) => {
  try {
    const data = await achievement.findOne({
      where: {
        id: req.params.id
      },
    });
    const achievements = data.dataValues;
    const comments = await feedback.findAll({
      where: {
        achievement_id: req.params.id
      }
    })
    // console.log(comments)
    const renderComments = comments.map(c => {
      return c = c.dataValues;
    })
    console.log(renderComments)
    res.status(200).render("single-achievement", {
      renderComments,
      achievements,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
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
