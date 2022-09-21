// Import Routes
const router = require('express').Router()
const userRoutes = require('./api/user-routes')
const thoughtRoutes = require('./api/thought-routes')

// Setting up Routers
router.use('/users', userRoutes)
router.use('/thoughts', thoughtRoutes)

module.exports = router