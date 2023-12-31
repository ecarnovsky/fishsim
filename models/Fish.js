const mongoose = require('mongoose')

const FishSchema = new mongoose.Schema({
  name: { type: String, unique: false },
  species: {type: String, unique: false},
  isMale: { type: Boolean, unique: false },
  ownerId: {type: String, uniqie: false},
  tankId: {type: String},
  age: {type: Number, unique: false},
  health: {type: Number},
  hunger: {type: Number },
  finGenome: {type: String}, 
  finDescription: {type: String}
})


module.exports = mongoose.model('Fish', FishSchema)
