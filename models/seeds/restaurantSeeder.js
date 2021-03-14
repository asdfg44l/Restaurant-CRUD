//env
require('./config/dotenv').loadEnv()

const db = require('../../config/mongoose')

const Restaurant = require('../restaurant')

const restaurantList = require('../../restaurant.json').results

db.once('open', () => {
  restaurantList.forEach(item => {
    Restaurant.create(item)
  })
})