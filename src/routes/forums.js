const express = require('express')
const router = express.Router()
const forumsController = require('../controllers/forums')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, forumsController.getForums)

module.exports = router