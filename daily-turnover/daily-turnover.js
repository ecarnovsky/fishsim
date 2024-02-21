const Fish = require('../models/fish')
const Tank = require('../models/tank')
const User = require('../models/user')
const FishClass = require('../fish/fish-class')


const connectDB = require('../config/database')

require('dotenv').config({path: './config/.env'})


connectDB()

if (process.env.CRON_JOB === "true"){
    dayTurn()
}



async function  dayTurn () {


    console.log("Daily turnover started at " + new Date())

    //////////// Aging the fish ///////////////
    const tanks = await Tank.find()

    for(let i = 0; i < tanks.length; i++){

        let fishInTank = await Fish.find({tankId: tanks[i]._id})
        let owner = await User.findOne({_id: tanks[i].ownerId})

        for (let j = 0; j < fishInTank.length; j++){
            await FishClass.ageFish(fishInTank[j], fishInTank, owner)
        }

        // let numberOfFishOwmed = (await Fish.find({ownerId: tanks[i].ownerId})).length
        // await User.findOneAndUpdate({_id: tanks[i].ownerId}, {numberOfFish: numberOfFishOwmed})
        await User.findOneAndUpdate({_id: tanks[i].ownerId}, {numberOfFish: owner.numberOfFish})

    }


    ////////// Pet shop ///////////////
    await Fish.deleteMany({petshopFish: true})

    let numberOfNewPetshopFish = Math.floor(Math.random() * 3) + 2

    for (let i = 0; i < numberOfNewPetshopFish; i++){
        const newFish = FishClass.generateRandomFish('petshop')
        Fish.create(newFish)
    }


    console.log("Daily turnover complete at " + new Date())
}


module.exports = {dayTurn}