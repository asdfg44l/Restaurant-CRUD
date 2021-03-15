//env
require('../../config/dotenv').loadEnv()

const db = require('../../config/mongoose')
const bycrpt = require('bcryptjs')
const User = require('../user')
const Restaurant = require('../restaurant')

const restaurantList = require('../../restaurant.json').results
const defaultUsers = [
  {//#1, 2, 3
    name: 'root1',
    password: '12345678',
    email: 'user1@example.com',
    ownRestaurant: [1, 2, 3]
  },
  {//#4, 5, 6
    name: 'root2',
    password: '12345678',
    email: 'user2@example.com',
    ownRestaurant: [4, 5, 6]
  }
]

db.once('open', () => {
  //run seed
  Promise.all(defaultUsers.map(defaultUser =>
    //is User already exist?
    User.findOne({ email: defaultUser.email })
      .then(user => {
        if (user) {
          return process.exit()
        }
        return bycrpt
          .genSalt(10)
          .then(salt => bycrpt.hash(defaultUser.password, salt))
          .then(hash => User.create({
            name: defaultUser.name,
            email: defaultUser.email,
            password: hash
          }))
          .then(user => user)
      })
      .catch(err => console.log(err))
  ))
    .then(() => {
      //之後用 async 取代~ 不然好難看阿
      return Promise.all(defaultUsers.map(own => {
        const ownRestaurant = restaurantList.filter(item => own.ownRestaurant.includes(item.id))
        return User.findOne({ email: own.email }).then(user => {
          return Promise.all(ownRestaurant.map(own => {
            return Restaurant.create({
              ...own,
              userId: user._id
            })
          }))
        })
      }))
    })
    .then(() => process.exit())
    .catch(err => console.log(err))

})