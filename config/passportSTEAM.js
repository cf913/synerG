const Strategy = require('passport-steam').Strategy
const keys = require('./keys')
const Player = require('../models/player')
const convertor = require('steam-id-convertor')
const request = require('request-promise')
const util = require('util')

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
            // Convert steam64 to 32 to use OpenDOTA Api
            const steam32 = convertor.to32(profile.id) 

            request.get(`https://api.opendota.com/api/players/${steam32}`)
              .then(dataJSON => {
                const data = JSON.parse(dataJSON)
                let mmr = {}
        
                if (data.mmr_estimate.estimate) mmr.mmr_estimate = data.mmr_estimate.estimate 
                if (data.solo_competitive_rank) mmr.mmr_solo     = data.solo_competitive_rank
                if (data.competitive_rank) mmr.mmr_party         = data.competitive_rank
                
                const newPlayer = new Player({
                  steamId: profile.id,
                  steam32,
                  mmr,
                  steamName: profile.displayName,
                  steam: profile._json,
                  img: profile.photos[2].value
                })
    
                console.log(newPlayer)
                newPlayer.save()
                  .then(() => {
                    return done(null, newPlayer)
                  })
                  .catch(err => {
                    console.log(err)
                  })

              })
              .catch(err => {
                console.log(err)
                return {}
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