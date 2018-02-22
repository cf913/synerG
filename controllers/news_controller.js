const Post = require('@models/post')
const Player = require('@models/player')
const request = require('request-promise')
const config = require('@config')
const jwt = require('jsonwebtoken')

module.exports = {

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