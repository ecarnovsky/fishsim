const Fish = require('../models/fish')
const Tank = require('../models/tank')

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

        
    }
}