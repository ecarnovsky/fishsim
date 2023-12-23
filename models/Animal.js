const mongoose = require('mongoose')

const AnimalSchema = new mongoose.Schema({
  name: { type: String, unique: false },
  species: {type: String, unique: false},
  isMale: { type: Boolean, unique: true },
  ownerId: {type: String, uniqie: false},
  age: {type: SVGAnimatedInteger, unique: false}
})


module.exports = mongoose.model('Animal', AnimalSchema)
