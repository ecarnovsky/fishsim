const Fish = require('../models/fish')
const Tank = require('../models/tank')
const User = require('../models/user')
const FishClass = require('../fish/fish-class')

module.exports = {
    dayTurn: async (req, res) => {
        
        const tanks = await Tank.find({ownerId: req.user._id})

        for(let i = 0; i < tanks.length; i++){

            let fishInTank = await Fish.find({tankId: tanks[i]._id})

            for (let j = 0; j < fishInTank.length; j++){
                await FishClass.ageFish(fishInTank[j], fishInTank, req)
            }
        }

        let numberOfFishOwmed = (await Fish.find({ownerId: req.user._id})).length
        await User.findOneAndUpdate({_id: req.user._id}, {numberOfFish: numberOfFishOwmed})

        res.json("Successful day change.")
    }
}

