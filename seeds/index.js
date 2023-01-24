const sequelize = require('../config/connection');
require('../models');

(async () => {
    await sequelize.sync({ force: true });
    process.exit(0);
})();