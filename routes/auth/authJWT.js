const express = require('express')
const router = express.Router()
const Player = require('@models/player')
const api = require('@controllers/auth_controller')
const jwt = require('jsonwebtoken')
const config = require('../../config/index.js')
const passport = require('passport')


router.post('/login', api.login(Player))
router.post('/register', api.signup(Player))

router.post('/confirm-login', passport.authenticate('jwt'), api.confirmLogin(Player))

module.exports = router