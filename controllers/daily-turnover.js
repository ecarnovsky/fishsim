// const Fish = require('../models/fish')
// const Tank = require('../models/tank')
// const User = require('../models/user')
// const FishClass = require('../fish/fish-class')
const DailyTurnover = require('../daily-turnover/daily-turnover')

module.exports = {
    dayTurn: async (req, res) => {

        if(req.body.CRON_JOB_GITHUB_KEY === process.env.CRON_JOB_SERVER_KEY){
            await DailyTurnover.dayTurn()
            res.json("Successful day change.")
        } else {
            res.json("Key is invalid.")
        }

    }
}

