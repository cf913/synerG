const CommunitiesController = require('@controllers/communities_controller')
const Community = require('@models/community')
let express = require('express')
const router = express.Router()
const passport = require('passport')
const config = require('@config')
const jwt = require('jsonwebtoken')


// Get list of teams
router.post('/', CommunitiesController.getCommunities)
// // Get team details

router.post('/new', passport.authenticate('jwt'), CommunitiesController.createCommunity)
// router.post('/myteams', passport.authenticate('jwt'), TeamsController.getMyTeams)
router.get('/:id',  CommunitiesController.getCommunity)
// router.post('/:id/send', passport.authenticate('jwt'), TeamsController.sendTeamRequest)
// router.post('/:id/cancel', passport.authenticate('jwt'), TeamsController.cancelTeamRequest)
// router.post('/:id/leave', passport.authenticate('jwt'), TeamsController.leaveTeam)

// // Making sure a user CAN NOT edit someone else's team
// router.use('/:id/:action', passport.authenticate('jwt'), (req, res, next) => {
//   jwt.verify(req.query.token, config.secret, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({
//             title: 'Not Authenticated',
//             error: err
//         })
//       }
//       // check if in teamAdmins
//       Team.findById({_id: req.params.id})
//         .then(team => {
//           if (team.teamAdmins.filter(adminId => (adminId.player.toString() === decoded._id)).length) {
//             // is a team admin: aduthorize
//             next() 
//           } else {
//             // block access to route
//             return res.status(401).json({
//               title: 'Not your team sry bro',
//               error: err
//             })
//           }
//         })
//         .catch(err => {
//           return res.status(404).json({
//             title: 'Team not found',
//             error: err
//           })
//         })
//   })
// });

// // Edit teams
// router.post('/:id/edit', TeamsController.editTeam)
// router.post('/:id/decline', TeamsController.declineTeamRequest)
// router.post('/:id/accept', TeamsController.acceptTeamRequest)
// router.post('/:id/delete', TeamsController.deleteTeam)

module.exports = router