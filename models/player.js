const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const SteamSchema = require('./steamDetails')
const Schema = mongoose.Schema

const PlayerSchema = new Schema({
  userId: String,
  username: {type: String, index: true, required: true},
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

const Player = mongoose.model('player', PlayerSchema)

module.exports = Player