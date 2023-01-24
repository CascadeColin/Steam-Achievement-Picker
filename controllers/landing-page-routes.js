const router = require("express").Router();
const { feedback, user, ownedGame, achievement } = require("../models");
const sequelize = require(".././config/connection");
const withAuth = require("../utils/auth");

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

router.get("/achievements", withAuth, (req, res) => {
  res.render("all-achievements", {
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

router.get("/single-achievement", (req,res) => res.render("single-achievement"));

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
