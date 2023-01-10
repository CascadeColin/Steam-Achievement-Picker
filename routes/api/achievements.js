const router = require('express').Router();
require('dotenv').config();

// GET achievements for steam id & app id
router.get('/achievements', (req, res) => {
  fetch(`http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${process.env.APP_ID}&key=${process.env.API_KEY}&steamid=${process.env.STEAM_ID}`)
  .then(data => data.json())
  .catch(err => console.log(err));
})

module.exports = router;
