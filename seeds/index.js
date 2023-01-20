const sequelize = require('../config/connection');
const { user, ownedGame, feedback, achievement } = require('../models');
const seedUsers = require('./userData.json');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    const newUsers = await user.bulkCreate(seedUsers, {
        individualHooks: true,
        returning: true,
    });

    // will add functionality to automatically POST data on achievements and ownedGames based on steamid upon account creation
    process.exit(0);
}

seedAll();