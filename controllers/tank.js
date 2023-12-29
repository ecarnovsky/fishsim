const Fish = require('../models/fish')
const Tank = require('../models/tank')

module.exports = {
    getTank: async (req, res) => {
        let tankId = req.path.substring(1)
        res.render('tank.ejs', {user: req.user, fish: await Fish.find({tankId: tankId})})
    }
}