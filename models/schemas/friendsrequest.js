const mongoose = require('mongoose')

const Schema = mongoose.Schema

const FriendsRequestSchema = new Schema({
  seen: Boolean,
  status: String, // SENT: user is waiting for a user to accept or RECEIVED: got a request from a user
  sender: {type: Schema.Types.ObjectId, ref: 'player'},
  receiver: {type: Schema.Types.ObjectId, ref: 'player'},
  res: String // ACCEPTED or REJECTED or PENDING
})