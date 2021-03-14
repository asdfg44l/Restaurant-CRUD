const express = require('express')
// const restaurant = require('../../models/restaurant')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//取得頁面
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})

//搜尋功能
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const userId = req.user._id

  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => {
      const restaurantList = restaurants.filter(restaurant => {
        return restaurant.name.toLocaleLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { restaurantList, keyword })
    })
})

module.exports = router