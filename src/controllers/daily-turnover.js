
import * as DailyTurnover from '../daily-turnover/daily-turnover.js'

module.exports = {
    dayTurn: async (req, res) => {

        if(process.env.CRON_JOB_GITHUB_KEY === process.env.CRON_JOB_SERVER_KEY || req.body.CRON_JOB_GITHUB_KEY == process.env.CRON_JOB_SERVER_KEY ){
            console.log('Daily turnover key is valid. About to start daily turnover...')
            await DailyTurnover.dayTurn()
            res.json("Daily turnover complete.")
        } else {
            console.log("Invalid daily turnover key was sent.")
            res.json("Key is invalid.")
        }
    }
}

