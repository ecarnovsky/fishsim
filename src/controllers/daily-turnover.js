
import * as DailyTurnover from '../daily-turnover/daily-turnover.js'


module.exports = {
    dayTurn: async (req, res) => {

        if(req.body.CRON_JOB_GITHUB_KEY === process.env.CRON_JOB_SERVER_KEY || process.env.CRON_JOB_GITHUB_KEY === process.env.CRON_JOB_SERVER_KEY){
            await DailyTurnover.dayTurn()
            res.json("Successful day change.")
        } else {
            res.json("Key is invalid.")
        }

    }
}

