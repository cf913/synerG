const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RelationshipSchema = new Schema({
  user1: String,
  user2: String,
  relation: { type: Number, default: 0 }
  // 0: none
  // 1: friends
  // 2: pending
})

const Relationship = mongoose.model('relationship', RelationshipSchema)

module.exports = Relationship