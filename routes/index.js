const express = require('express')
const router = express.Router()

//route module
const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const user = require('./modules/users')

//use
router.use('/', home)
router.use('/restaurant', restaurant)
router.use('/users', user)

module.exports = router