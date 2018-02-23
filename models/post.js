const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({  
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


const Post = mongoose.model('Post', PostSchema)

module.exports = Post