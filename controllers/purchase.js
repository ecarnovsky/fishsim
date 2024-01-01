const Fish = require('../models/fish')
const User = require('../models/user')

module.exports = {
    buyFish: async (req, res) => {

        let newTankId = req.body.newTankId
        let fishId = req.body.fishId
        let newOwnerId = req.user._id



        let fish = await Fish.findOneAndUpdate({_id: fishId}, {ownerId: newOwnerId, tankId: newTankId, petshopFish: false, forSale: false})

        await User.findOneAndUpdate({_id: newOwnerId}, {numberOfFish: req.user.numberOfFish + 1, money: req.user.money - fish.salePrice})



        if (req.body.seller === "user"){
            // give money to the seller and lower their number
            // of fish by one. 
        }



        res.json('Fish bought successfully.')
    }
}