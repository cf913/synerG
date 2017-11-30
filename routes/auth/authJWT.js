const express = require('express')
const router = express.Router()
const Player = require('@models/player')
const api = require('@controllers/auth_controller')
var jwt = require('jsonwebtoken')
let config = require('../../config/index.js')


router.post('/login', api.login(Player))
router.post('/register', api.signup(Player))

// router.use('/', (req, res, next) => {
//   jwt.verify(req.query.token, config.secret, (err, decoded) => {
//       if (err) {
//           return res.status(401).json({
//               title: 'Not Authenticated',
//               error: err
//           });
//       }
//       next();
//   })
// });

router.post('/confirm-login', api.confirmLogin(Player))

module.exports = router