const Fish = require('../models/fish')
const Tank = require('../models/tank')
const User = require('../models/user')
const FishClass = require('../fish/fish-class')

module.exports = {
    dayTurn: async (req, res) => {

        //////////// Aging the fish ///////////////
        const tanks = await Tank.find()

        for(let i = 0; i < tanks.length; i++){

            let fishInTank = await Fish.find({tankId: tanks[i]._id})

            for (let j = 0; j < fishInTank.length; j++){
                await FishClass.ageFish(fishInTank[j], fishInTank, req)
            }
        }

        let numberOfFishOwmed = (await Fish.find({ownerId: req.user._id})).length
        await User.findOneAndUpdate({_id: req.user._id}, {numberOfFish: numberOfFishOwmed})



        ////////// Pet shop ///////////////
        await Fish.deleteMany({petshopFish: true})

        let numberOfNewPetshopFish = Math.floor(Math.random() * 3) + 2

        for (let i = 0; i < numberOfNewPetshopFish; i++){
            const newFish = FishClass.generateRandomFish('petshop')
            Fish.create(newFish)
        }




        res.json("Successful day change.")
    }
}

