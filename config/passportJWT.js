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
  passport.use(new Strategy(parameters, (payload, done) => {
    Player.findOne({ steamId: payload.id }, (error, user) => {
      if (error) {
        console.log(error)
        return done(error, false)
      }
      if (user) {
        console.log('ACCESS GRANTED')
        done(null, user)
      } else {
        console.log('Please login')
        done(null, false)
      }
    })

  }))
}