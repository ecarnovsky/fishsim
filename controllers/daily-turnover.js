const Fish = require('../models/fish')
const Tank = require('../models/tank')
const FishClass = require('../fish/fish-class')

module.exports = {
    dayTurn: async (req, res) => {
        
        const tanks = await Tank.find({ownerId: req.user._id})

        for(let i = 0; i < tanks.length; i++){

            let fishInTank = await Fish.find({tankId: tanks[i]._id})

            for (let j = 0; j < fishInTank.length; j++){
                FishClass.ageFish(fishInTank[j], fishInTank, req)
            }
        }

        res.json("Successful day change.")
    }
}

