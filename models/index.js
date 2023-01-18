const User = require("./User");
const ownedGames = require("./OwnedGames");
const feedback = require("./feedback");
const Achievements = require("./Achievement");

// user has many ownedGames (1:N)
// ownedGames has many achievements (1:N)
// achievements has many feedback (1:N)
// user has many feedback (1:N)

User.hasMany(ownedGames, { 
    foreignKey: 'user_id',
    onDelete: 'CASCADE', 
});

ownedGames.belongsTo(User, { 
    foreignKey: 'user_id',
    onDelete: 'SET NULL' 
});

ownedGames.hasMany(Achievements, {
    foreignKey: 'game_id',
    onDelete: 'CASCADE',
});

Achievements.belongsTo(ownedGames, {
    foreignKey: 'game_id',
    onDelete: 'SET NULL'
});

User.hasMany(feedback, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

feedback.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: 'SET NULL'
});

Achievements.hasMany(feedback, {
    foreignKey: 'achievement_id',
    onDelete: 'CASCADE',
});

feedback.belongsTo(Achievements, {
    foreignKey: 'achievement_id',
    onDelete: 'SET NULL'
});

module.exports = { User, ownedGames, feedback, Achievements };