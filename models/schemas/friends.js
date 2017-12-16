const mongoose = require('mongoose')

const Schema = mongoose.Schema

const FriendsSchema = new Schema({
  accepted: [String],
  pending_sent: [String],
  pending_received: [String],
  blocked: [String]
})