const NewsController = require('@controllers/news_controller')
let express = require('express')
const router = express.Router()
const passport = require('passport')
const config = require('@config')
const jwt = require('jsonwebtoken')

// Start new conversation
// router.get('/', passport.authenticate('jwt'), NewsController.getNews)
// View messages to and from authenticated user
router.post('/', passport.authenticate('jwt'), NewsController.newPost)

module.exports = router