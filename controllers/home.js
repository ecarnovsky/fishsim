const Fish = require('../models/fish')
const Tank = require('../models/tank')

module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs', {user: req.user})
    },
    // getFish: async (req,res)=> {
    //     res.render('fish.ejs', {user: req.user, fish: await Fish.find({ownerId: req.user._id}).sort({age: -1})})
    // }
    getTanks: async (req, res)=> {
        // add sort by tank creation date in the future 
        res.render('tanks.ejs', {user: req.user, tanks: await Tank.find({ownerId: req.user._id})})
    }
}