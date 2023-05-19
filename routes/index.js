const router = require('express').Router();

const apiRoutes = require('./api')

//creating a new endpoint specifically for the api
router.use('/api', apiRoutes);

module.exports = router;