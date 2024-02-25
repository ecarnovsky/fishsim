const { Decimal128 } = require('mongodb')
const mongoose = require('mongoose')

const TankSchema = new mongoose.Schema({
    name: String,
    gallons: Number,
    ownerId: String,
    temperature: Number
})

module.exports = mongoose.model('Tank', TankSchema)
