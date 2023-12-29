const Fish = require('../models/Fish')
const Tank = require('../models/Tank')

module.exports = {
    getTank: async (req, res) => {
        let tankId = req.path.substring(1)
        res.render('tank.ejs', {user: req.user, fish: await Fish.find({tankId: tankId})})
    }
}