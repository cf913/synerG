const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConversationSchema = new Schema({  
  participants: [{ type: Schema.Types.ObjectId, ref: 'Player'}],
})

const Conversation = mongoose.model('Conversation', ConversationSchema)

module.exports = Conversation