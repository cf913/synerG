let express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/steam', passport.authenticate('steam', { failureRedirect: '/' }), (req, res) => {
  res.send('auth')
})

router.get(
  '/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), (req, res) => {
      console.log('Success!')
  res.redirect('/')
})

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/home');
});

module.exports = router