const Player = require('@models/player')
const Relationship = require('@models/relationship') 
const request = require('request-promise')
const convertor = require('steam-id-convertor')
const config = require('@config')
const jwt = require('jsonwebtoken')

const api = {
  ////////////////////////////////////
  getFriends(req, res, next) {
    Relationship.find({$or: [{ $and: [{ user1: req.params.id },{ relation: 1 }]}, 
                             { $and: [{ user2: req.params.id }, { relation: 1 }]}]})
      .then(data => {
        console.log(data)
        const friends = []
        data.forEach(value => {
          friends.push(value.user1 == req.params.id ? value.user2 : value.user1)
        })
        console.log(friends)
        res.send({friends})
      })
  },

  ////////////////////////////////////
  // req.body: {requester: steamId, requestee: steamId}
  //
  declineRequest(req, res, next) {
    const rqster = req.body.from
    const rqstee = req.body.to
    // DECLINED: cancel the request
    let updateSender = Player.findOneAndUpdate({ steamId: rqster }, 
                                               { $pullAll: { 'friends.pending_sent': [rqstee] }}, 
                                               { new: true })
    let updateReceiver = Player.findOneAndUpdate({ steamId: rqstee }, 
                                               { $pullAll: {'friends.pending_received': [rqster] }}, 
                                               { new: true })
    Promise.all([updateSender, updateReceiver])
      .then(data => {
        res.send('Friendship declined')
      })
      .catch(err => { res.send(err) })
  },

  ////////////////////////////////////
  // req.body: {requester: steamId, requestee: steamId}
  //
  acceptRequest(req, res, next) {
    const rqster = req.body.from
    const rqstee = req.body.to
    let friendsAlready = false
    // ACCEPTED: 
    // create new or update existing relationship
    let query = sortUsers(rqster, rqstee)
    Relationship.findOne({user1: query.user1, user2: query.user2})
      .then(data => {
        if (!data) {
          Relationship.create({ user1: query.user1, user2: query.user2, relation: 1 })
            .then(data => res.send('Relationship created'))
            .catch(err => res.send(err))
        }
        else if (data.relation !== 1) {
          console.log(data.relation) 
          Relationship.findOneAndUpdate({ user1: query.user1, user2: query.user2 }, 
                                                                          { relation: 1 })
          .then(data => res.send('Relationship updated'))
          .catch(err => res.send(err))
        }
        else {
          friendsAlready = true
          res.send('Friends already')
        }
      })
      .catch(err => res.send(err)) // end create new or update
    
    if (!friendsAlready) {
      // update users friends.accepted list
      let updateRequester = Player.findOneAndUpdate({ steamId: rqster }, 
                                                  { $push: {'friends.accepted': rqstee }}, 
                                                  { new: true })
      let updateRequestee = Player.findOneAndUpdate({ steamId: rqstee }, 
                                                    { $push: {'friends.accepted': rqster}}, 
                                                    { new: true })
      let cancelRequester = Player.findOneAndUpdate({ steamId: rqster }, 
                                                    { $pullAll: { 'friends.pending_sent': [rqstee] }}, 
                                                    { new: true })
      let cancelRequestee = Player.findOneAndUpdate({ steamId: rqstee }, 
                                                    { $pullAll: {'friends.pending_received': [rqster] }}, 
                                                    { new: true })
      Promise.all([updateRequester, updateRequestee, cancelRequester, cancelRequestee])
      .then(data => {
        res.send('You are now friends')
      }) 
    } else {
      res.send('Friends already')
    }
  },

  ////////////////////////////////////
  // updates the relationship by changing relation to 0
  // removes ids from both friends.accepted lists
  removeFriend(req, res, next) {
    let query = sortUsers(req.body.from, req.body.to)
    Relationship.findOneAndUpdate({ $and: [
                                    { user1: query.user1 }, 
                                    { user2: query.user2 }, 
                                    { relation: 1 }
                                  ]}, 
                                  { $set: { relation: 0 }})
    .then((data) => {
      if (!data) res.send('Dafuk??? You where not even friends??')
      else {
        let unfriendRequester = Player.findOneAndUpdate({ steamId: query.user1}, 
                                                        { $pullAll: { 'friends.accepted': [query.user2] }},
                                                        { new: true })
        let unfriendRequestee = Player.findOneAndUpdate({ steamId: query.user2}, 
                                                        { $pullAll: { 'friends.accepted': [query.user1] }},
                                                        { new: true })
        Promise.all([unfriendRequester, unfriendRequestee])
          .then(blub => {
            res.send(`${query.user1} and ${query.user2} are no longer friends`)
          })
          .catch(err => {
            res.send(err)
          })
      }
    })
    .catch(err => {
      console.log(err)
    })
  },

  ////////////////////////////////////
  // updates the friends.pending_sent list of the Sender
  // updates the friends.pending_recieved list of the Receiver
  // if one of the update fails, the request is cancel
  sendRequest(req, res, next) {
    let query = sortUsers(req.body.from, req.body.to)
    console.log("User1: " + query.user1)
    console.log("User2: " + query.user2)
    Relationship.find({$and: [{ user1: query.user1 } , { user2: query.user2 }, { relation: 1 }]})
    .then(data => {
      if (!data) res.json({message:'Already friends!', success: false })
      else {
        let updateSender = Player.findOneAndUpdate({ steamId: req.body.from }, 
                                                   { $push: {'friends.pending_sent': req.body.to }}, 
                                                   { new: true })
        let updateReceiver = Player.findOneAndUpdate({ steamId: req.body.to }, 
                                                     { $push: {'friends.pending_received': req.body.from }}, 
                                                     { new: true })
        
        Promise.all([updateSender, updateReceiver])
          .then(data => {
            if (data[0] == null) {
              if (data[1] == null) res.send('Your request has failed, Nobody found, pls try again later')
              else {
                Player.findOneAndUpdate({ steamId: req.body.to }, 
                                        { $pullAll: {'friends.pending_received': [req.body.from] }}, 
                                        { new: true }) 
                .then(data => {
                  res.send('Your request has failed, Sender not found, pls try again later')
                })
                .catch(err => {
                  res.send(err)
                }) 
              }
            } else if (data[1] == null && data[0] != null) {
              Player.findOneAndUpdate({ steamId: req.body.from }, 
                                      { pullAll: { 'friends.pending_sent': [req.body.to] }}, 
                                      { new: true })
                .then(data => {
                  res.send('Your request has failed, Receiver not found, pls try again later')
                })
                .catch(err => {
                  res.send(err)
                }) 
            } else {
              res.send('Sucess: your friends request has been sent')
            }
          })
          .catch(err => {
            res.send(err)
          })
      }
    })
    .catch(err => {
      console.log(err)
    })
  },

  ////////////////////////////////////
  // removes ids from Senders pending_sent list
  // removes ids from Receivers pending_received list
  cancelRequest(req, res, next) {
    let updateSender = Player.findOneAndUpdate({ steamId: req.body.from }, 
                                               { $pullAll: { 'friends.pending_sent': [req.body.to] }}, 
                                               { new: true })
    let updateReceiver = Player.findOneAndUpdate({ steamId: req.body.to }, 
                                                 { $pullAll: {'friends.pending_received': [req.body.from] }}, 
                                                 { new: true })
    Promise.all([updateSender, updateReceiver])
      .then(data => {
        res.send('Request cancelled')
      })
      .catch(err => res.send(err))
  }
} // end module

module.exports = api


//////////////////////////////// HELPER FUNCTIONS ///////////////////////////////////

// Get steamId from token
function getIdFromToken(token) {
  jwt.verify(token, config.secret, (err, decoded) => {
    if (decoded.id) return decoded.id
  })
}

// Order user ids to store in model. user1 should always be the smallest id
// Prevents duplication 
function sortUsers(user1, user2) {
  let small = user1
  let big = user2
  if (small > big) {
    small = user2,
    big = user1
  }  
  return { user1: small, user2: big }
}

