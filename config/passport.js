const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook')
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
        if (!password) {
          return done(null, false, req.flash('warning_msg', 'Email or Password incorrect'))
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, req.flash('warning_msg', 'Email or Password incorrect'))
          }
          return done(null, user)
        })
      })
        .catch(err => console.log(err))
    }))
  //登入驗證策略(Facebook)
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  },
    (accessToken, refreshToken, profile, done) => {
      const { name, email } = profile._json
      //find or create
      User.findOne({ email }).then(user => {
        if (user) {
          return done(null, user)
        }
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          })
            .then(user => done(null, user))
            .catch(err => done(err, false))
          )
      })
    }
  ));
  //序列化
  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })
  //去序列化
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, false))
  })
}