const Fish = require('../models/fish')
const Tank = require('../models/tank')
const User = require('../models/user')

module.exports = {
    getTank: async (req, res) => {
        let tankId = req.path.substring(1)
        res.render('tank.ejs', {user: req.user, fish: await Fish.find({tankId: tankId}), tank: await Tank.findById(tankId)})
    },
    changeTemperature: async (req, res) => {
        try {
            const tank = await Tank.find({_id: req.body.tankId})
            if (req.body.changeInTemperature == 'increase'){
        
                await Tank.findOneAndUpdate({_id: req.body.tankId}, {temperature: tank[0].temperature + 1} )

             } else if (req.body.changeInTemperature == 'decrease'){

                await Tank.findOneAndUpdate({_id: req.body.tankId}, {temperature: tank[0].temperature - 1} )

            }

            res.json('Temperature successfully changed')
        }
        catch(err){
            console.log(err)
        }

        
    }, 
    feedFish: async (req,res)=>{
        try{
            await User.findByIdAndUpdate({_id: req.user._id}, {money: req.user.money - 1})

            let fish = await Fish.find({tankId: req.body.tankId})

            for (let i = 0; i < fish.length; i++){

                let newHunger = fish[i].hunger + 15 > 100 ? 100 : fish[i].hunger + 15

                await Fish.findOneAndUpdate({_id: fish[i]._id}, {hunger: newHunger})
            }
            res.json('Fish fed successfully.')
        }
        catch(err){
            console.log(err)
        }   
    }, 
    sellFish: async (req, res)=>{
        try{

            for(let i = 0; i < req.body.idsOfSelected.length; i++){
                await Fish.remove({_id: req.body.idsOfSelected[i]})
            }

            await User.findOneAndUpdate({_id: req.user._id}, {money: parseInt(req.user.money) + req.body.valueOfFish, numberOfFish: req.user.numberOfFish - req.body.idsOfSelected.length})

            res.json('Fish successfully sold.')

        }
        catch(err){
            console.log(err)
        }
    }

}