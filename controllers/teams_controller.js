const Team = require('@models/team')
const Player = require('@models/player')
const request = require('request-promise')
const config = require('@config')
const jwt = require('jsonwebtoken')

module.exports = {
  
  createTeam(req, res, next) {
    console.log(req.body)
    let data = new Team(req.body.data)
    console.log(data)
    data.teamAdmins.push(req.body.user._id)
    data.save()
    .then(team => {
      console.log('New team created')
      res.send(team)
    })
    .catch(err => {
      console.log(err)
    })
  },
  
  getTeams(req, res, next) {
    console.log(req.body)
    let query = buildQuery(req.body)
    console.log(query)
    Team.find(query).limit(30)
    .then((teams) => {
        res.send(teams)
    })
    .catch(err => {
        console.log(err)
    })
  },
  
  getMyTeams(req, res, next) {
    console.log(req.body)
    Team.find({ $or: [{teamAdmins: req.body._id}, {teamMembers: req.body._id}]})
    .then(team => {
      res.send(team)
    })
    .catch(err => {
      console.log(err)
    })
  },
  
  getTeam(req, res, next) {
    Team.findOne({_id: req.params.id})
    .populate({path: 'teamAdmins', model: Player})
    .exec(function (err, team) {
    if (err) return console.log(err);
    console.log(team);
    })
    .then(team => {
      res.send(team)
    })
    .catch(err => {
      console.log(err)
    })
  },
  
  editTeam(req, res, next) {
    Team.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    .then(team => {
        res.send(team)
    })
    .catch(err => {
        res.send(err)
    })
  }
}

function buildQuery(body) {
  let query = {}
  if (Object.keys(body).length === 0) return query
  // build query
  // if (body.regions.length > 0) {
  //   query['regions'] = {$in: body.regions}
  // }
  // if (body.languages.length > 0) {
  //   query['languages'] = {$in: body.languages}
  // }
  // if (body.comms.length > 0) {
  //   query['comms'] = {$in: body.comms}
  // }
  // if (body.recruiting.length > 0) {
  //   query['recruiting'] = {$in: body.recruiting}
  // }
  // if (body.competitiveness.length > 0) {
  //   query['competitiveness'] = body.competitiveness
  // }
  if (body.regions !== null) {
    query.regions = body.regions
  }
  if (body.languages !== null) {
    query.languages = body.languages
  }
  if (body.comms !== null) {
    query.comms = body.comms
  }
  if (body.recruiting !== null) {
    query.recruiting = body.recruiting
  }
  if (body.competitiveness !== null) {
    query.competitiveness = body.competitiveness
  }
  return query
}