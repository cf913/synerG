const express = require('express')
const router = express.Router()
const Player = require('@models/player')
const api = require('@controllers/auth_controller')
const passport = require('passport')

router.post('/confirm-login', passport.authenticate('jwt'), api.confirmLogin(Player))

module.exports = router