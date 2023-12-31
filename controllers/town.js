const Fish = require('../models/fish')

module.exports = {
    getTown: (req, res) => {
        res.render('town.ejs', {user: req.user})
    }, 
    getFishshop: async (req, res) => {
        let fish = await Fish.find({petshopFish: true})
        res.render('fishshop.ejs', {user: req.user, fish: fish})
    }
}