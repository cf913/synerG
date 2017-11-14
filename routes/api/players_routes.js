const PlayersController = require('../controllers/players_controller')
let express = require('express')
const router = express.Router()
const passport = require('passport')
const config = require('@config')


// Get list of players
router.get('/players', PlayersController.getPlayers)
// Get player details
router.get('/players/:id',  PlayersController.getPlayer)
// Create new player
router.post('/players/new', PlayersController.create)

module.exports = router