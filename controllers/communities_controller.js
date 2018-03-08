const Community = require('@models/community')
const Player = require('@models/player')
const request = require('request-promise')
const config = require('@config')
const jwt = require('jsonwebtoken')

module.exports = {
  
  createCommunity(req, res, next) {
    console.log(req.body)
    let data = new Community(req.body.data)
    // console.log(data)
    data.admins.push(req.body.player.player)
    data.save()
    Player.findOneAndUpdate({_id: req.body.player.player}, {$push: {"communities" : data._id}})
    .then(community => {
      console.log('New community created')
      res.send(community)
    })
    .catch(err => {
      console.log(err)
    })
  },

  getCommunity(req, res, next) {
    Community.findOne({_id: req.params.id})
    .populate([{path: 'admins', model: Player}, {path: 'members', model: Player}, {path: 'pending', model: Player}])
    .exec((err, community) => {
    if (err) return console.log(err);
    return;
    })
    .then(community => {
      res.send(community)
    })
    .catch(err => {
      console.log(err)
    })
  },

  getCommunities(req, res, next) {
    console.log(req.body)
    let query = buildQuery(req.body)
    console.log(query)
    Community.find(query).limit(30)
    .then(communities => {
        res.send(communities)
    })
    .catch(err => {
        console.log(err)
    })
  }
}

function buildQuery(body) {
  let query = {}
}