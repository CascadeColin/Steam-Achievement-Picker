const express = require('express')
const router = express.Router();
const landingPageRoutes = require('./landing-page-routes')
const apiRoutes = require('./api')

router.use('/',landingPageRoutes );
router.use('/api', apiRoutes)

module.exports = router;