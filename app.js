const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const router = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose') //connect database

//PORT
const PORT = 3000

//express app
const app = express()

//view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
//public
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//session
app.use(session({
  secret: 'greenfrog',
  resave: false,
  saveUninitialized: true
}))
//flash 
app.use(flash())

//passport
usePassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.success_msg = req.flash('success_msg')
  next()
})

//route
app.use(router)

//listening
app.listen(PORT)
