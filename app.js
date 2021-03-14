const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const usePassport = require('./config/passport')
require('./config/mongoose') //connect database

//PORT
const PORT = 3000

//express app
const app = express()

//view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//session
app.use(session({
  secret: 'greenfrog',
  resave: false,
  saveUninitialized: true
}))

//passport
usePassport(app)

//public
app.use(express.static('public'))

//route
const router = require('./routes')

app.use(router)

//listening
app.listen(PORT)
