const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/', homeController.getIndex)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)
router.get('/fish', ensureAuth, homeController.getFish)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)

module.exports = router