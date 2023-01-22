const express = require('express')
const router = express.Router();
const landingPageRoutes = require('./landing-page-routes')
const apiRoutes = require('./api')
const dashboardRoutes = require('./dashboard-routes')

router.use('/', landingPageRoutes );
router.use('/api', apiRoutes)
router.use('/dashboard', dashboardRoutes)

module.exports = router;