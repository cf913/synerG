const TeamsController = require('@controllers/teams_controller')
const Team = require('@models/team')
let express = require('express')
const router = express.Router()
const passport = require('passport')
const config = require('@config')
const jwt = require('jsonwebtoken')


// Get list of teams
router.post('/', TeamsController.getTeams)
// Get team details

router.post('/new', passport.authenticate('jwt'), TeamsController.createTeam)
router.post('/myteams', passport.authenticate('jwt'), TeamsController.getMyTeams)
router.get('/:id',  TeamsController.getTeam)
router.post('/:id/send', TeamsController.sendTeamRequest)
router.post('/:id/decline', TeamsController.declineTeamRequest)
router.post('/:id/accept', TeamsController.acceptTeamRequest)

// Making sure a user CAN NOT edit someone else's team
router.use('/:id/:action', passport.authenticate('jwt'), (req, res, next) => {
  jwt.verify(req.query.token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
            title: 'Not Authenticated',
            error: err
        })
      }
      // check if in teamAdmins
      Team.findById({_id: req.params.id})
        .then(team => {
          if (team.teamAdmins.filter(adminId => (adminId.toString() === decoded._id)).length) {
            // is a team admin: aduthorize
            next() 
          } else {
            // block access to route
            return res.status(401).json({
              title: 'Not your team sry bro',
              error: err
            })
          }
        })
        .catch(err => {
          return res.status(404).json({
            title: 'Team not found',
            error: err
          })
        })
  })
});

// Edit teams
router.post('/:id/edit', TeamsController.editTeam)

module.exports = router