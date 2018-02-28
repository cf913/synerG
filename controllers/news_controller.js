const Post = require('@models/post')
const Player = require('@models/player')
const request = require('request-promise')
const config = require('@config')
const jwt = require('jsonwebtoken')

module.exports = {

  getPosts(req, res, next) {  
    // Only return one message from each conversation to display as snippet
    Post.find().limit(30)
    .sort({createdAt: 'descending'})
    .populate({path: 'author', model: Player, select: '_id img steamName'})
    .then(posts => {
      // console.log(posts)
      res.send(posts)
    })
    .catch(err => {
      console.log('This is error message')
      res.send(err)
    })
  },

  newPost(req, res, next) {
    if(!req.body.post) {
      res.status(422).send({ error: 'Please enter a message.' })
      return
    }
    const post = new Post({
      body: req.body.post,
      author: req.body.author
    })
    post.save()
    .then(post => {
      console.log('New Post Created')
      console.log(post)
      res.send(post)
    })
    .catch(err => {
      console.log(err)
    })
  }
}