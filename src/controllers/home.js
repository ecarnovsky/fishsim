const Fish = require('../models/fish')
const Tank = require('../models/tank')

module.exports = {
    getIndex: (req,res)=>{

        res.render('index.ejs', {user: req.user})

    },
    getTanks: async (req, res)=> {

        res.render('tanks.ejs', {user: req.user, tanks: await Tank.find({ownerId: req.user._id})})
    
    },
    getFish: async (req,res) =>{

        let fishId = req.path.split('/')[2]
        res.render('fish.ejs', {user: req.user, fish: await Fish.find({_id: fishId}) })
    
    }
}