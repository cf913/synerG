const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const SteamSchema = require('./schemas/steamDetails')
const HeroSchema = require('./schemas/heroes')
// const FriendsSchema = require('./schemas/friends')
const Schema = mongoose.Schema


const PlayerSchema = new Schema({
  // username: {type: String, index: true, required: true, unique: true},
  // password: {type: String, required: true},
  // email: {type: String, required: true, unique:true },
  steamId: {type: String, index: true, required: true, unique: true},
  steam32: String,
  steamName: String,
  steam: SteamSchema,
  img: String,
  mmr: {
    mmr_estimate: Number,
    mmr_solo: Number,
    mmr_party: Number
  },
  positions: [String],
  description: String,
  languages: [String],
  country: String,
  regions: [String],
  comms: [String],
  heroes: [HeroSchema],
  inbox: {
    read: Boolean,
    author: String,
    content: String,
  },
  // posts: [{type: Schema.Types.ObjectId, ref: 'post'}],
  // comments: [{type: Schema.Types.ObjectId, ref: 'comment'}],
  friends: {
    accepted: [String],
    pending_sent: [String],
    pending_received: [String],
    blocked: [String]
  },
  teams: [{type: Schema.Types.ObjectId, ref: 'Team'}],
  communities: [{type: Schema.Types.ObjectId, ref: 'Community'}]
}, { minimize: false })



PlayerSchema.plugin(uniqueValidator);

// PlayerSchema.pre('save', function (next) {
//   const user = this

//   if (this.isModified('password') || this.isNew) {
//     bcrypt.genSalt(10, (error, salt) => {
//       if (error) return next(error)
//       bcrypt.hash(user.password, salt, (error, hash) => {
//         if (error) return next(error)
//         user.password = hash
//         next()
//       })
//     })
//   } else {
//     return next()
//   }
// })

// PlayerSchema.methods.comparePassword = function (password, callback) {
//   bcrypt.compare(password, this.password, (error, matches) => {
//     if (error) return callback(error)
//     callback(null, matches)
//   });
// };

const Player = mongoose.model('Player', PlayerSchema)

module.exports = Player