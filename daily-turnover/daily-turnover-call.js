const DailyTurnover = require("./daily-turnover")
require('dotenv').config({path: './config/.env'})
const connectDB = require('../config/database')


connectDB()



DailyTurnover.dayTurn()