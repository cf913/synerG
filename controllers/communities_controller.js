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
  },

  sendCommunityRequest(req, res, next) {
    console.log(req.body)
    Community.findOneAndUpdate({_id: req.params.id}, {$push: {"pending": req.body._id}}, {new: true})
    .then(community => {
      console.log("request sent")
      console.log(community)
      res.send(community)
    })
    .catch(err => {
      res.send(err)
    })
  },

  declineCommunityRequest(req, res, next) {
    console.log(req.body)
    Community.findOneAndUpdate({_id: req.params.id}, {$pull: {"pending": {player: req.body._id}}}, {new: true})
    .then(community => {
      console.log("request declined")
      console.log(community)
      res.send(community)
    })
    .catch(err => {
      res.send(err)
    })
  },
  
  acceptCommunityRequest(req, res, next) {
    console.log('Accepting request')
    console.log(req.body)
    let updatePlayer = Player.findOneAndUpdate({_id: req.body._id}, {$push: {"communities" : req.params.id}}, {new: true})
    let updateCommunity = Community.findOneAndUpdate({_id: req.params.id}, {$pull: {"pending": req.body._id}, $push: {"members": req.body._id}}, {new: true})
    Promise.all([updatePlayer, updateCommunity])
    .then(community => {
      console.log("request accepted")
      console.log(community)
      res.send(community)
    })
    .catch(err => {
      res.send(err)
    })
  },

  cancelCommunityRequest(req, res, next) {
    console.log(req.body)
    Community.findOneAndUpdate({_id: req.params.id}, {$pull: {"pending": {player: req.body._id}}}, {new: true})
    .then(community => {
      console.log("request cancelled")
      console.log(community)
      res.send(community)
    })
    .catch(err => {
      res.send(err)
    })
  },
  
  leaveCommunity(req, res, next) {
    console.log('Leaving Community')
    console.log(req.body)
    let communityUpdate = Community.findOneAndUpdate({_id: req.params.id}, {$pull: {'admins': req.body._id, 'members': req.body._id}}, {new: true})
    let playerUpdate = Player.findOneAndUpdate({_id: req.body._id}, {$pull: {"communities" : req.params.id}}, {new: true})
    Promise.all([communityUpdate, playerUpdate])
    .then(community => {
      console.log("left community")
      console.log(community)
      res.send(community)
    })
    .catch(err => {
      res.send(err)
    })
  },
  
  deleteCommunity(req, res, next) {
    console.log('Deleting Community')
    console.log(req.body)
    let communityUpdate = Community.findOneAndRemove({_id: req.params.id})
    let playerUpdate = Player.findOneAndUpdate({_id: req.body._id}, {$pull: {"communities" : req.params.id}}, {new: true})
    Promise.all([communityUpdate, playerUpdate])
    .then(community => {
      console.log("deleted community")
      console.log(community)
      res.send(community)
    })
    .catch(err => {
      res.send(err)
    })
  }
}

function buildQuery(body) {
  let query = {}
}