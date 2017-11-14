const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const SteamSchema = require('./steamDetails')
const Schema = mongoose.Schema

const PlayerSchema = new Schema({
  username: {type: String, index: true, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique:true },
  steamId: String,
  steamName: String,
  steam: [SteamSchema],
  img: String,
  mmr: Number,
  languages: [String],
  country: String,
  regions: [String],
  comms: [String]
  // posts: [{type: Schema.Types.ObjectId, ref: 'post'}],
  // comments: [{type: Schema.Types.ObjectId, ref: 'comment'}],
  // friends: [{type: Schema.Types.ObjectId, ref: 'player'}],
  // teams: [{type: Schema.Types.ObjectId, ref: 'team'}],
})

PlayerSchema.plugin(uniqueValidator);

PlayerSchema.pre('save', function (next) {
  const user = this

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error)
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return next(error)
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

PlayerSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (error, matches) => {
    if (error) return callback(error)
    callback(null, matches)
  });
};

const Player = mongoose.model('player', PlayerSchema)

module.exports = Player