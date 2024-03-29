const express = require('express')
const router = express.Router()
const townController = require('../controllers/town')
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/', ensureAuth, townController.getTown)
router.get('/fishshop', ensureAuth, townController.getFishshop)

module.exports = router