const Fish = require('../models/Fish')

module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs', {user: req.user})
    },
    getFish: async (req,res)=> {
        res.render('fish.ejs', {user: req.user, usersFish: await Fish.find({ownerId: req.user._id}).sort({age: -1})})
    }
}