
import * as DailyTurnover from '../daily-turnover/daily-turnover.js'


module.exports = {
    dayTurn: async (req, res) => {

        if(process.env.CRON_JOB_GITHUB_KEY === process.env.CRON_JOB_SERVER_KEY || req.body.CRON_JOB_GITHUB_KEY && req.body.CRON_JOB_GITHUB_KEY.toString() === process.env.CRON_JOB_SERVER_KEY ){
            console.log('Key is valid. About to start daily turnover...')
            await DailyTurnover.dayTurn()
            res.json("Daily turnover complete.")
        } else {
            console.log("Key is invalid.")
            res.json("Key is invalid.")
        }
    }
}

