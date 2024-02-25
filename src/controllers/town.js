const Fish = require('../models/fish')
const Tank = require('../models/tank')

module.exports = {
    getTown: (req, res) => {
        res.render('town.ejs', {user: req.user})
    }, 
    getFishshop: async (req, res) => {
        let fish = await Fish.find({petshopFish: true})
        let tanks = await Tank.find({ownerId: req.user._id})
        res.render('fishshop.ejs', {user: req.user, fish: fish, tanks: tanks})
    }
}