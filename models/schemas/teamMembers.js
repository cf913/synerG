const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TeamMembersSchema = new Schema({
  player: {type: Schema.Types.ObjectId, ref: 'Player'},
  position: String
})