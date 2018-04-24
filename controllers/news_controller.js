const Post = require('@models/post')
const Player = require('@models/player')
const Team = require('@models/team')
const Signal = require('@models/signal')
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
  },

  getSignals(req, res, next) {
    let query = buildQuery(req.body)  
    Signal.find(query).limit(30)
    .sort({createdAt: 'descending'})
    .populate([{path: 'player', model: Player, select: '_id img steamName'}, {path: 'team', model: Team, select: '_id teamName'}])
    .then(signals => {
      console.log(signals)
      res.send(signals)
    })
    .catch(err => {
      console.log('This is error message')
      res.send(err)
    })
  },

  newPlayerSignal(req, res, next) {
    if(!req.body.signal) {
      res.status(422).send({ error: 'Missing fields' })
      return
    }
    console.log(req.body)
    const signal = new Signal({
      position: req.body.signal.position,
      language: req.body.signal.language,
      region: req.body.signal.region,
      competitiveness: req.body.signal.competitive,
      isPlayer: true,
      description: req.body.signal.description,
      player: req.body.player._id
    })
    signal.save()
    .then(signal => {
      console.log('New Signal Created')
      console.log(signal)
      res.send(signal)
    })
    .catch(err => {
      console.log(err)
    })
  },

  newTeamSignal(req, res, next) {
    if(!req.body.signal) {
      res.status(422).send({ error: 'Missing fields' })
      return
    }
    console.log(req.body)
    const signal = new Signal({
      position: req.body.signal.position,
      language: req.body.signal.language,
      region: req.body.signal.region,
      competitiveness: req.body.signal.competitive,
      isPlayer: false,
      description: req.body.signal.description,
      team: req.body.team
    })
    signal.save()
    .then(signal => {
      console.log('New Signal Created')
      console.log(signal)
      res.send(signal)
    })
    .catch(err => {
      console.log(err)
    })
  }
}

function buildQuery(body) {
    let query = {}
    if (Object.keys(body).length === 0) return query
    if (body.region !== null) {
        query.region = body.region
    }
    if (body.language !== null) {
        query.language = body.language
    }
    if (body.competitiveness !== null) {
        query.competitiveness = body.competitiveness
    }
    if (body.position !== null) {
        query.position = body.position
    }
    if (body.isPlayer !== null) {
        query.isPlayer = body.isPlayer
    }
    return query
}