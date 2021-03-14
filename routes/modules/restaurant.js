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
  const userId = req.user._id
  const selected_restaurant_id = req.params.id
  Restaurant.findOne({ id: selected_restaurant_id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

//新增頁面
router.post('/add', (req, res) => {
  const userId = req.user._id
  Restaurant.create({
    ...req.body,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//前往編輯
router.get('/edit/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  Restaurant.findOne({ id, userId })
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
  const userId = req.user._id
  const id = req.params.id
  const { name, location, category, phone, image, rating, description } = req.body

  return Restaurant.findOne({ id, userId })
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
  const userId = req.user._id
  const id = req.params.id
  return Restaurant.findOne({ id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router