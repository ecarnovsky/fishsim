const express = require('express')
const router = express.Router()
const townController = require('../controllers/town')
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/', townController.getTown)

module.exports = router