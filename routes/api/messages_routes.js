const MessagesController = require('@controllers/messages_controller')
let express = require('express')
const router = express.Router()
const passport = require('passport')
const config = require('@config')
const jwt = require('jsonwebtoken')

// Start new conversation
router.get('/check', passport.authenticate('jwt'), MessagesController.checkConversation)
router.post('/new/:recipient', passport.authenticate('jwt'), MessagesController.newConversation)

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

// View messages to and from authenticated user
router.get('/', MessagesController.getConversations)
// Retrieve single conversation
router.get('/:id', MessagesController.getConversation)
// Send reply in conversation
router.post('/:id', MessagesController.sendReply)

module.exports = router