const router = require('express').Router();

// importing the user route and thought routes
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes')

//getting user route and thought routes and defining the api endpoint for the same
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;