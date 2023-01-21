const sequelize = require('../config/connection');
const { user, ownedGame, feedback, achievement } = require('../models');
const seedUsers = require('./userData.json');
const seedGames = require('./gameData.json');
const seedAchievements = require('./achievementData.json');
const seedFeedback = require('./feedbackData.json');

//TODO: add functionality to automatically POST data on achievements and ownedGames based on steamid upon account creation

const seedAll = async () => {
    // connect to db
    await sequelize.sync({ force: true });

    // seed 'user' table
    const newUsers = await user.bulkCreate(seedUsers, {
        individualHooks: true,
        returning: true,
    });

    for (const game of seedGames) {
        const newGames = await ownedGame.create({
            ...game,
            // randomly assign a user_id
            user_id: newUsers[Math.floor(Math.random()*newUsers.length)].id
        });
    }

    for (const achievements of seedAchievements) {
        const newAchievements = await achievement.create({
            ...achievements,
            //hardcoded random value of 1,2,3,or4 because newGames not available in this scope
            game_id: Math.ceil(Math.random()*4)
        });
    }

    for (const feedbacks of seedFeedback) {
        const newFeedback = await feedback.create({
            ...feedbacks,
            achievement_id: Math.ceil(Math.random()*3),
            user_id: newUsers[Math.floor(Math.random()*newUsers.length)].id
        });
    }
    
    process.exit(0);
}

seedAll();