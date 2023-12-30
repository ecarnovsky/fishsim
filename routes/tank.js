const express = require('express')
const router = express.Router()
const tankController = require('../controllers/tank')
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/*', ensureAuth, tankController.getTank)
router.put('/changeTemperature', ensureAuth, tankController.changeTemperature)

module.exports = router 