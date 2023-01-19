const router = require("express").Router();
const { user } = require("../../models");
const sequelize = require("../../config/connection");
const fetch = require("node-fetch");
require("dotenv").config();

//TODO: dynamically apply appid and steamid to fetch URL. Use these consts for testing only.
const appid = 236850;
const steamid = 76561198142429533;

// TODO: will add middleware to check for logged in state once I get the calls working

// get player achievements
router.get("/achievements", async (req, res) => {
  fetch(
    `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${process.env.API_KEY}&steamid=${steamid}`
  )
    .then((res) => res.json())
    .then((data) => res.status(200).json(data));
});

// get owned games
router.get("/ownedgames", async (req, res) => {
  fetch(
    `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.API_KEY}&steamid=${steamid}&format=json&include_appinfo=true&`
  )
    .then((res) => res.json())
    .then((data) => res.status(200).json(data));
});

// get news for specific appid
router.get("/gamenews", async (req, res) => {
  fetch(
    `http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${appid}&count=3&maxlength=300&format=json`
  )
    .then((res) => res.json())
    .then((data) => res.status(200).json(data));
});

// get friends list
router.get("/friends", async (req, res) => {
  fetch(
    `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${process.env.API_KEY}&steamid=${steamid}&relationship=friend`
  )
    .then((res) => res.json())
    .then((data) => res.status(200).json(data));
});

module.exports = router;
