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

    Player.findOne({ id: payload.id }, (error, user) => {
      if (error) return done(error, false)
      if (user) done(null, user)
      else done(null, false)
    })

  }))
}