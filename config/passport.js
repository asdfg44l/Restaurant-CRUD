const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())

  //local Strategy
  passport.use(new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    (req, email, password, done) => {
      User.findOne({ email }).then(user => {
        if (!user) {
          return done(null, false, req.flash('warning_msg', 'This email is not registered.'))
        }
        if (user.password !== password) {
          return done(null, false, req.flash('warning_msg', 'Incorrect password.'))
        }
        return done(null, user)
      })
        .catch(err => console.log(err))
    }))

  //序列化
  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })
  //去序列化
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err, false))
  })
}