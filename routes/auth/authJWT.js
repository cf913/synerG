let express = require('express')
const router = express.Router()
const Player = require('@models/player')
const api = require('@controllers/auth_controller')


router.post('/login', api.login(Player))
router.post('/register', api.signup(Player))

module.exports = router