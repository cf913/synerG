const PassportJWT = require('passport-jwt')
const ExtractJWT = PassportJWT.ExtractJwt
const Strategy = PassportJWT.Strategy
const config = require('./index.js')
const Player = require('../models/player')

module.exports = (passport) => {
  const parameters = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
  }

  passport.use(new Strategy(parameters, (payload, done) => {
    console.log('PLAYLOAD:' + payload)
    Player.findOne({ steamId: payload.id }, (error, user) => {
      if (error) {
        conso
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
}