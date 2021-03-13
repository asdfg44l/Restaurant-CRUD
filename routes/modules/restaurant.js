const express = require('express')
const router = express.Router()

//db
const Restaurant = require('../../models/restaurant')

//formInfo
const restaurantForm = require('../../restaurantForm.json').results

//前往新增
router.get('/add', (req, res) => {
  const config = {
    pageTitle: '新增',
    method: '/restaurant/add'
  }
  res.render('table', { config, restaurantForm })
})

//取得詳細資訊
router.get('/:id', (req, res) => {
  const selected_restaurant_id = req.params.id
  Restaurant.findById(selected_restaurant_id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

//新增頁面
router.post('/add', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//前往編輯
router.get('/edit/:id', (req, res) => {
  ///restaurant/edit/{{ restaurant._id }}?_method=PUT
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      const config = {
        pageTitle: `編輯: ${restaurant.name}`,
        method: `/restaurant/edit/${restaurant._id}?_method=PUT`
      }
      let Form = restaurantForm.map(item => {
        item.value = restaurant[item.formName]
        return item
      })
      console.log(config.method)
      res.render('table', { config, restaurantForm: Form })
    })
    .catch(err => console.log(err))
})

//編輯頁面
router.put('/edit/:id', (req, res) => {
  const id = req.params.id
  const { name, location, category, phone, image, rating, description } = req.body

  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.location = location
      restaurant.category = category
      restaurant.phone = phone
      restaurant.image = image
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error))
})

//刪除頁面
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//搜尋功能
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.filter(restaurant => {
    return restaurant.name.toLocaleLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants, keyword })
})

module.exports = router