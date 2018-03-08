const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const CommunitySchema = new Schema({
  communityName: String,
  description: String,
  members: [{type: Schema.Types.ObjectId, ref: 'Player'}],
  admins: [{type: Schema.Types.ObjectId, ref: 'Player'}],
  pending: [{type: Schema.Types.ObjectId, ref: 'Player'}]
})

const Community = mongoose.model('Community', CommunitySchema)

module.exports = Community