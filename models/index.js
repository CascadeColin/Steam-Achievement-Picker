const user = require("./User");
const ownedGame = require("./ownedGame");
const feedback = require("./feedback");
const achievement = require("./achievement");

// user has many ownedGames (1:N)
// ownedGames has many achievement (1:N)
// achievement has many feedback (1:N)
// user has many feedback (1:N)

// changed every model to singular instead of plural - we had a lot of bugs (mixing "user" and "users", for example).  Keeping it all to no "s" at the end.

user.hasMany(ownedGame, { 
    foreignKey: 'user_id',
    onDelete: 'CASCADE', 
});

ownedGame.belongsTo(user, { 
    foreignKey: 'user_id',
});

ownedGame.hasMany(achievement, {
    foreignKey: 'game_id',
    onDelete: 'CASCADE',
});

achievement.belongsTo(ownedGame, {
    foreignKey: 'game_id',
});

user.hasMany(feedback, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

feedback.belongsTo(user, {
    foreignKey: "user_id",
});

achievement.hasMany(feedback, {
    foreignKey: 'achievement_id',
    onDelete: 'CASCADE',
});

feedback.belongsTo(achievement, {
    foreignKey: 'achievement_id',
});

module.exports = { user, ownedGame, feedback, achievement };