const User = require("./User");
const ownedGames = require("./OwnedGames");

User.hasMany(ownedGames, { foreignKey: 'userId' });
ownedGames.belongsTo(User, { foreignKey: 'userId' });

//FIXME:  ownedGames hasMany achievements, achievements belongsTo ownedGames.  add in foreign key
ownedGames.hasMany();
.belongsTo(ownedGames);

module.exports = { User };