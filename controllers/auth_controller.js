const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('@config')

const api = {}
api.confirmLogin = (User) => (req,res) => {
  const steamId = req.body.id
  User.findOne({steamId})
    .then(user => {
      console.log(user)
      res.json({success: true, message: 'Logged In', user})
    })
    .catch(error => {
      res.status(401).send({ success: false, message: error })
    })
}

api.login = (User) => (req, res) => {
  User.findOne({ email: req.body.email }, (error, user) => {
    if (error) throw error

    if (!user) res.status(401).send({ success: false, message: 'Authentication failed. User not found.' })
    else {
      user.comparePassword(req.body.password, (error, matches) => {
        if (matches && !error) {
          const token = jwt.sign({ user }, config.secret)
          const data = { 
            token: token,
            localId: user._id,
            user: user,
            expires: 7200
          }
          res.json({ success: true, message: 'Token granted', data })
        } else {
          res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' })
        }
      })
    }
  })
}

api.verify = (headers) => {
  if (headers && headers.authorization) {
    const split = headers.authorization.split(' ')
    if (split.length === 2) return split[1]
    else return null
  } else return null
}

api.signup = (User) => (req, res) => {
  console.log(req.body.email + ' ' + req.body.password + ' ' + req.body.username)
  if (!req.body.email || !req.body.password || !req.body.username) res.json({ success: false, message: 'Please, pass an username and password.' })
  else {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })

    user.save(error => {
      if (error) return res.status(400).json({ success: false, message: 'Username already exists.' })
      const token = jwt.sign({ user }, config.secret)
      User.findOne({ email: req.body.email }, (error, user) => {
        if (error) throw error

        if (!user) res.status(401).send({ success: false, message: 'Authentication failed. User not found.' })
        else {
          user.comparePassword(req.body.password, (error, matches) => {
            if (matches && !error) {
              const token = jwt.sign({ user }, config.secret)
              const data = { 
                token: token,
                localId: user._id,
                user: user,
                expires: 7200 
              }
              res.json({ success: true, message: 'Token granted', data })
            } else {
              res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' })
            }
          })
        }
      })
      //res.json({ success: true, message: 'Account created successfully' })
    })
  }
}

module.exports = api