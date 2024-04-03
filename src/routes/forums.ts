import * as express from "express"
const router = express.Router()
import * as forumsController from '../controllers/forums'
import { ensureAuth, ensureGuest } from '../middleware/auth'

router.get('/', ensureAuth, forumsController.getForums)

module.exports = router