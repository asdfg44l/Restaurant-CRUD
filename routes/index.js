const express = require('express')
const router = express.Router()

//route module
const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const user = require('./modules/users')
const auth = require('./modules/auth')

//middleware
const { authenticator } = require('../middleware/auth')

//use
router.use('/restaurant', authenticator, restaurant)
router.use('/users', user)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router