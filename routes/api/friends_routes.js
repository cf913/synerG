const FriendsController = require('@controllers/friends_controller')
let express = require('express')
const router = express.Router()
const passport = require('passport')
const config = require('@config')
const jwt = require('jsonwebtoken')


// ROUTES
router.get('/:id', FriendsController.getFriends)

// Filter fraudulent friends request
router.use(passport.authenticate('jwt'), (req, res, next) => {
  jwt.verify(req.query.token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
            title: 'Not Authenticated',
            error: err
        })
      }
      req.body.tokenId = decoded._id
      next();
  })
});

// FILTERED ROUTES
router.post('/update', FriendsController.updateFriends) // Update friendsList
router.post('/:id/accept', FriendsController.acceptRequest) // Accept friendship
router.post('/:id/decline', FriendsController.declineRequest) // Decline friendship
router.post('/:id/cancel', FriendsController.cancelRequest) // Cancel friends request
router.post('/:id/send', FriendsController.sendRequest) // Send friends request
router.delete('/:id/remove', FriendsController.removeFriend) // Remove user from friends list

module.exports = router