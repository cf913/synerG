const SteamStrategy = require('passport-steam').Strategy
const mongoose = require('mongoose')
const keys = require('./keys')
const Player = require('../models/player')

module.exports = function(passport) {
  passport.use(
    new SteamStrategy({
      returnURL: keys.returnURL,
      realm: keys.realm,
      apiKey: keys.apiKey,
      proxy: true
    },
    function(identifier, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(() => {
        console.log('Identifier:' + identifier)
        console.log('Profile: ' + profile)

        Player.findOne({userId: profile.id})
          .then(user => {
            if (user) {
              return done(null, user)
            }
            console.log('NEW USER')
            const newPlayer = new Player({
              userId: profile.id,
              username: profile.displayName,
              steam: profile._json,
              img: profile.photos[2].value
            })
            newPlayer.save()
              .then(() => {
                console.log('NEW USER SAVED')
                return done(null, newPlayer)
              })
          })
          .catch(err => console.log(err))

          // To keep the example simple, the user's Steam profile is returned to
          // represent the logged-in user.  In a typical application, you would want
          // to associate the Steam account with a user record in your database,
          // and return that user instead.
          // profile.identifier = identifier;
          // return done(null, profile)
        })
      }
    )
  )
}