const express = require('express')
const router = express.Router()

//route module
const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const user = require('./modules/users')

//middleware
const { authenticator } = require('../middleware/auth')

//use
router.use('/restaurant', authenticator, restaurant)
router.use('/users', user)
router.use('/', authenticator, home)

module.exports = router