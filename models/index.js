const User = require("./User");
const ownedGames = require("./OwnedGames");
const feedback = require("./feedback");
const Achievements = require("./Achievement");

User.hasMany(ownedGames, { 
    foreignKey: 'userId',
    onDelete: "CASCADE", 
});

ownedGames.belongsTo(User, { 
    foreignKey: 'userId' 
});

ownedGames.hasMany(Achievements, {
    foreignKey: "game_id"
});
Achievements.belongsTo(ownedGames, {
    foreignKey: "game_id"
});

User.hasMany(feedback, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

feedback.belongsTo(User, {
    foreignKey: "user_id",
});

Achievements.hasMany(feedback, {
    foreignKey: "achievement_id",
});

feedback.belongsTo(Achievements, {
    foreignKey: "achievement_id",
});



module.exports = { User, ownedGames, feedback, Achievements };