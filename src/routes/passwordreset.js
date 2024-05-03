const express = require('express')
const router = express.Router()
const passwordResetController = require('../controllers/password-reset')
const { ensureAuth, ensureGuest } = require('../middleware/auth')



router.get('/', ensureGuest, passwordResetController.resetPassword)
router.post('/sendemail', passwordResetController.sendEmailCode)


module.exports = router 