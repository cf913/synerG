const TeamsController = require('@controllers/teams_controller')
let express = require('express')
const router = express.Router()
const passport = require('passport')
const config = require('@config')
const jwt = require('jsonwebtoken')


// Get list of teams
router.get('/teams', TeamsController.getPlayers)
router.post('/teams', TeamsController.getPlayers)
// Get team details
router.get('/teams/:id',  TeamsController.getPlayer)

// Making sure a user CAN NOT edit someone else's profile
router.use('/teams/:id/edit', (req, res, next) => {
  jwt.verify(req.query.token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
            title: 'Not Authenticated',
            error: err
        })
      }
      console.log(decoded.id)
      console.log(req.params.id)
      if (decoded.id != req.params.id) {
        return res.status(401).json({
          title: 'Not your team sry bro',
          error: err
        })
      }
      next();
  })
});

// Edit player
router.post('/teams/:id/edit',  passport.authenticate('jwt'), TeamsController.editPlayer)

module.exports = router