const PassportJWT = require('passport-jwt')
const ExtractJWT = PassportJWT.ExtractJwt
const Strategy = PassportJWT.Strategy
const config = require('./index.js')
const Player = require('../models/player')

module.exports = (passport) => {
  const parameters = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token')
  }
  console.log('USING THE STRAT')
  passport.use(new Strategy(parameters, (payload, done) => {
    console.log('PLAYLOAD:' + payload.id)
    Player.findOne({ steamId: payload.id }, (error, user) => {
      if (error) {
        console.log(error)
        return done(error, false)
      }
      if (user) {
        console.log('ACCESS GRANTED')
        done(null, user)
      } else {
        console.log('ELSE WTF??')
        done(null, false)
      }
    })

  }))

  // return {
  //   initialize: function() {
  //       return passport.initialize();
  //   },
  //   authenticate: function() {
  //     console.log("AUTHENTICATING...")
  //       return passport.authenticate("jwt", config.secret);
  //   }
  // }
}