const Player = require('@models/player')
const Relationship = require('@models/relationship') 
const request = require('request-promise')
const convertor = require('steam-id-convertor')
const config = require('@config')
const jwt = require('jsonwebtoken')

const api = {
  ////////////////////////////////////
  getFriends(req, res, next) {
    console.log(req.params.id)
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

  updateFriends(req, res, next) {
    console.log('Updating friends....')
    Player.findById(req.params.id)
    .select('friends')
    .then(data => {
      console.log('new freinds: ' + data)
      res.send(data)
    })
    .catch(err => { res.send(err) })
  },

  ////////////////////////////////////
  // req.body: {requester: steamId, requestee: steamId}
  //
  declineRequest(req, res, next) {
    const rqster = req.params.id
    const rqstee = req.body.tokenId
    
    // DECLINED: cancel the request
    let updateRequester = Player.findByIdAndUpdate(rqster, 
                                               { $pullAll: { 'friends.pending_sent': [rqstee] }}, 
                                               { new: true })
    let updateRequestee = Player.findByIdAndUpdate(rqstee, 
                                               { $pullAll: {'friends.pending_received': [rqster] }}, 
                                               { new: true })
    Promise.all([updateRequester, updateRequestee])
      .then(data => {
        console.log('DECLIIIIIIIIIIINED')
        res.send(data[1])
      })
      .catch(err => { res.send(err) })
  },

  ////////////////////////////////////
  // req.body: {requester: steamId, requestee: steamId}
  //
  acceptRequest(req, res, next) {
    const rqster = req.params.id
    const rqstee = req.body.tokenId
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
      let updateRequester = Player.findByIdAndUpdate(rqster, 
                                                    { $push: {'friends.accepted': rqstee }, $pullAll: { 'friends.pending_sent': [rqstee] }},
                                                    { new: true })
      let updateRequestee = Player.findByIdAndUpdate(rqstee, 
                                                    { $push: {'friends.accepted': rqster}, $pullAll: {'friends.pending_received': [rqster] }},
                                                    { new: true })
      Promise.all([updateRequester, updateRequestee])
      .then(data => {
        res.send(data[1])
      })
      .catch(err => res.send(err)) // end create new or update 
    } else {
      res.send('Friends already')
    }
  },

  ////////////////////////////////////
  // updates the relationship by changing relation to 0
  // removes ids from both friends.accepted lists
  removeFriend(req, res, next) {
    console.log('start remove...')
    let query = sortUsers(req.body.tokenId, req.params.id)
    Relationship.findOneAndUpdate({ $and: [
                                    { user1: query.user1 }, 
                                    { user2: query.user2 }, 
                                    { relation: 1 }
                                  ]}, 
                                  { $set: { relation: 0 }}).exec()
    .then((data) => {
      console.log(data)
      if (data.length) res.json({message: 'Dafuk??? You where not even friends??'})
      else {
        console.log('deleting...')
        let unfriendRequester = Player.findByIdAndUpdate(query.user1, 
                                                        { $pullAll: { 'friends.accepted': [query.user2] }},
                                                        { new: true })
        let unfriendRequestee = Player.findByIdAndUpdate(query.user2, 
                                                        { $pullAll: { 'friends.accepted': [query.user1] }},
                                                        { new: true })
        Promise.all([unfriendRequester, unfriendRequestee])
          .then(data => {
            console.log(data)
            if (data[0]._id === req.body.tokenId) res.send(data[0])
            else res.send(data[1])
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
    const rqsterId = req.body.tokenId
    const rqsteeId = req.params.id
    let query = sortUsers(rqsterId, rqsteeId)
    console.log("User1: " + query.user1)
    console.log("User2: " + query.user2)
    Relationship.find({$and: [{ user1: query.user1 } , { use2: query.user2 }, { relation: 1 }]})
    .then(data => {
      if (data.length) res.json({message:'Already friends!', success: false })
      else {
        let updateSender = Player.findByIdAndUpdate(rqsterId, 
                                                   { $push: {'friends.pending_sent': rqsteeId }}, 
                                                   { new: true })
        let updateReceiver = Player.findByIdAndUpdate(rqsteeId, 
                                                     { $push: {'friends.pending_received': rqsterId }}, 
                                                     { new: true })
        
        Promise.all([updateSender, updateReceiver])
          .then(data => {
            if (data[0] == null) {
              if (data[1] == null) res.send('Your request has failed, Nobody found, pls try again later')
              else {
                Player.findByIdAndUpdate(rqsteeId, 
                                        { $pullAll: {'friends.pending_received': [rqsterId] }}, 
                                        { new: true }) 
                .then(data => {
                  res.send('Your request has failed, Sender not found, pls try again later')
                })
                .catch(err => {
                  res.send(err)
                }) 
              }
            } else if (data[1] == null && data[0] != null) {
              Player.findByIdAndUpdate(rqsterId, 
                                      { pullAll: { 'friends.pending_sent': [rqsteeId] }}, 
                                      { new: true })
                .then(data => {
                  res.send('Your request has failed, Receiver not found, pls try again later')
                })
                .catch(err => {
                  res.send(err)
                }) 
            } else {
              res.send(data[0])
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
    const canceller = req.body.tokenId
    const requestee = req.params.id
    let updateRequester = Player.findByIdAndUpdate(canceller, 
                                               { $pullAll: { 'friends.pending_sent': [requestee] }}, 
                                               { new: true })
    let updateRequestee = Player.findByIdAndUpdate(requestee, 
                                                 { $pullAll: {'friends.pending_received': [canceller] }}, 
                                                 { new: true })
    Promise.all([updateRequester, updateRequestee])
      .then(data => {
        res.send(data[0])
      })
      .catch(err => res.send(err))
  }
} // end module

module.exports = api


//////////////////////////////// HELPER FUNCTIONS ///////////////////////////////////

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

