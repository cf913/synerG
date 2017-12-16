const FriendsController = require('@controllers/friends_controller')
let express = require('express')
const router = express.Router()
const passport = require('passport')
const config = require('@config')
const jwt = require('jsonwebtoken')


// ROUTES
router.get('/:id', FriendsController.getFriends)

// Filter fraudulent friends request
// router.use(passport.authenticate('jwt'), (req, res, next) => {
//   jwt.verify(req.query.token, config.secret, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({
//             title: 'Not Authenticated',
//             error: err
//         })
//       }
//       console.log(decoded.id)
//       console.log(req.params.id)
//       if (decoded.id != req.params.id) {
//         return res.status(401).json({
//           title: 'Not your profile sry bro',
//           error: err
//         })
//       }
//       next();
//   })
// });

// FILTERED ROUTES
router.post('/send', FriendsController.sendRequest) // Send friends request
router.post('/cancel', FriendsController.cancelRequest) // Cancel friends requeset
router.post('/accept', FriendsController.acceptRequest) // Accept friendship
router.post('/decline', FriendsController.declineRequest) // Decline friendship
router.delete('/remove', FriendsController.removeFriend) // Remove user from friends list

module.exports = router