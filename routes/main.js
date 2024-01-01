const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const homeController = require('../controllers/home')
const purchaseController = require('../controllers/purchase')
const dailyTurnoverController = require('../controllers/daily-turnover')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const purchase = require('../controllers/purchase')


router.get('/', homeController.getIndex)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)
router.get('/tanks', ensureAuth, homeController.getTanks)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.put('/dailyturnover', dailyTurnoverController.dayTurn)
router.put('/buyFish', ensureAuth, purchaseController.buyFish)


module.exports = router