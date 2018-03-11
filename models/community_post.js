const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommunityPostSchema = new Schema({  
  community: {type: Schema.Types.ObjectId, ref: 'Community'},
  body: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }
}, {
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});


const CommunityPost = mongoose.model('CommunityPost', CommunityPostSchema)

module.exports = CommunityPost