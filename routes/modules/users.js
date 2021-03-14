const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('此帳號已有人註冊')
      return res.render('register', { name, email, password, confirmPassword })
    }
    if (!name || !email || !password || !confirmPassword) {
      console.log('所有欄位皆為必填')
      return res.render('register', { name, email, password, confirmPassword })
    }
    if (password !== confirmPassword) {
      console.log('密碼與確認密碼不相符')
      return res.render('register', { name, email, password, confirmPassword })
    }
    User.create({
      name,
      email,
      password
    })
      .then(() => res.redirect('/users/login'))
      .catch(err => console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  // req.flash('success_msg', 'You have successfully logged out.')
  res.redirect('/users/login')
})

module.exports = router