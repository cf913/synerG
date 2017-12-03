let express = require('express')
const router = express.Router()
const passport = require('passport')
var jwt = require('jsonwebtoken')
let config = require('../../config/index.js')

router.get('/steam', passport.authenticate('steam'), (req, res) => {
})

router.get(
  '/steam/return', passport.authenticate('steam'), (req, res) => {
      if (req.user) {
        let token = jwt.sign({id: req.user.steamId}, config.secret, { expiresIn: 7200 })
        res.redirect(`/?steamid=${req.user.steamId}&token=${token}`);
      } else {
        res.redirect('/');
      }
})

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/home');
});

module.exports = router