const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database.js')

const mainRoutes = require('./routes/main.js')
const townRoutes = require('./routes/town.js')
const tankRoute = require('./routes/tank.js')
const forumsRoute = require('./routes/forums.js')


require('dotenv').config({path: './src/config/.env'})

require('./config/passport.js')(passport)

connectDB()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.use(express.static('src/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/town', townRoutes)
app.use('/tank', tankRoute)
app.use('/forums', forumsRoute)

//////////////testing/////////////////////////////////////
const d =require("./genetics/guppy-gene-list.js")
console.log(d)
/////////////////////////////////////////////////////

app.listen(process.env.PORT, ()=>{
    console.log('Server is running.')
})    