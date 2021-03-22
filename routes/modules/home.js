const express = require('express')
// const restaurant = require('../../models/restaurant')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//取得頁面
router.get('/', (req, res) => {
  const { keyword } = req.query
  const userId = req.user._id

  let sortRule;
  let { sortBy } = req.query
  sortBy = sortBy || 'asc'
  switch (sortBy) {
    case 'asc':
    case 'desc':
      sortRule = { name: sortBy }
      break
    default:
      sortRule = sortBy
  }
  Restaurant.find({ userId })
    .lean()
    .sort(sortRule)
    .then(restaurants => {
      //使用搜尋或篩選功能
      if (keyword) {
        const List = restaurants.filter(restaurant => {
          return restaurant.name.toLocaleLowerCase().includes(keyword.toLowerCase())
        })
        return res.render('index', { restaurants: List, keyword, sortBy })
      } else {
        return res.render('index', { restaurants, sortBy })
      }
    })
    .catch(err => console.log(err))
})

//搜尋功能
// router.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const userId = req.user._id

//   Restaurant.find({ userId })
//     .lean()
//     .sort({ _id: 'asc' })
//     .then(restaurants => {
//       const List = restaurants.filter(restaurant => {
//         return restaurant.name.toLocaleLowerCase().includes(keyword.toLowerCase())
//       })
//       res.render('index', { restaurants: List, keyword })
//     })
// })

module.exports = router