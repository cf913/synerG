const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RelationshipSchema = new Schema({
  user1: { type: Schema.Types.ObjectId, ref: 'player' },
  user2: { type: Schema.Types.ObjectId, ref: 'player' },
  relation: { type: Number, default: 0 }
})

const Relationship = mongoose.model('relationship', RelationshipSchema)

module.exports = Player