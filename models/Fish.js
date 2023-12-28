const mongoose = require('mongoose')

const FishSchema = new mongoose.Schema({
  name: { type: String, unique: false },
  species: {type: String, unique: false},
  isMale: { type: Boolean, unique: true },
  ownerId: {type: String, uniqie: false},
  age: {type: Number, unique: false}
})


module.exports = mongoose.model('Fish', FishSchema)
