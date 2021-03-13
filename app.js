const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

require('./config/mongoose') //connect database
//restaurant list
const restaurantList = require('./restaurant.json').results

//PORT
const PORT = 3000

//express app
const app = express()

//view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//public
app.use(express.static('public'))

//route
const router = require('./routes')

app.use(router)

//listening
app.listen(PORT)
