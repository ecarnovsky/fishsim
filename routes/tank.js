const express = require('express')
const router = express.Router()
const tankController = require('../controllers/tank')
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/*', ensureAuth, tankController.getTank)
router.put('/changeTemperature', ensureAuth, tankController.changeTemperature)
router.put('/feedFish', ensureAuth, tankController.feedFish)
router.put('/sellFish', ensureAuth, tankController.sellFish)

module.exports = router 