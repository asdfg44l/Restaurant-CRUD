const express = require('express')
const router = express.Router()

//route module
const home = require('./modules/home')
const restaurant = require('./modules/restaurant')

//use
router.use('/', home)
router.use('/restaurant', restaurant)

module.exports = router