const router = require('express').Router();
const userRoutes = require('./user-routes');
const apiRoutes = require('./api-routes');

// localhost:3001/api/ (this index.js is for the api paths)
router.use('/', apiRoutes);

// localhost:3001/api/users (because we are already in api, this routes to a subdirectory called /api/users)
router.use('/users', userRoutes);

module.exports = router;