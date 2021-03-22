const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const usePassport = require('./config/passport')
const hbsHelpers = require('./utils/hbsHelpers')
//env
require('./config/dotenv').loadEnv()
//connect database
require('./config/mongoose')

//PORT
const PORT = process.env.PORT

//express app
const app = express()

//view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: hbsHelpers }))
app.set('view engine', 'hbs')
//public
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//session
app.use(session({
  secret: process.env.SESSION_SECRET,
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
app.use(routes)

//listening
app.listen(PORT, () => {
  console.log(`The server is listening on http://localhost:${PORT}`)
})
