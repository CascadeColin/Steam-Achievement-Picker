const sequelize = require('../config/connection');
const { user, ownedGame, feedback, achievement } = require('../models');
const seedUsers = require('./userData.json');
const seedGames = require('./gameData.json');
const seedAchievements = require('./achievementData.json');
const seedFeedback = require('./feedbackData.json');

const seedAll = async () => {
    // connect to db
    await sequelize.sync({ force: true });

    // seed 'user' table
    const newUsers = await user.bulkCreate(seedUsers, {
        individualHooks: true,
        returning: true,
    });

    for (const game of seedGames) {
        await ownedGame.create({
            ...game,
            // randomly assign a user_id
            user_id: newUsers[Math.floor(Math.random()*newUsers.length)].id
        });
    }

    for (const achievements of seedAchievements) {
        await achievement.create({
            ...achievements,
            game_id: Math.ceil(Math.random()*4)
        });
    }

    for (const feedbacks of seedFeedback) {
        await feedback.create({
            ...feedbacks,
            achievement_id: Math.ceil(Math.random()*3),
            user_id: newUsers[Math.floor(Math.random()*newUsers.length)].id
        });
    }
    
    process.exit(0);
}

seedAll();