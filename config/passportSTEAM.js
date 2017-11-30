const Strategy = require('passport-steam').Strategy
const keys = require('./keys')
const Player = require('../models/player')

module.exports = (passport) => {

  const parameters = {
    returnURL: keys.returnURL,
    realm: keys.realm,
    apiKey: keys.apiKey,
    proxy: true
  }

  passport.use(new Strategy(parameters, (identifier, profile, done) => {
      // asynchronous verification, for effect...
      process.nextTick(() => {

        Player.findOne({steamId: profile.id})
          .then(user => {
            if (user) {
              return done(null, user)
            }
            const newPlayer = new Player({
              steamId: profile.id,
              steamName: profile.displayName,
              steam: profile._json,
              img: profile.photos[2].value
            })
            newPlayer.save()
              .then(() => {
                return done(null, newPlayer)
              })
              .catch(err => {
                console.log(err)
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