const NewsController = require('@controllers/news_controller')
let express = require('express')
const router = express.Router()
const passport = require('passport')
const config = require('@config')
const jwt = require('jsonwebtoken')

router.get('/', passport.authenticate('jwt'), NewsController.getPosts)
router.post('/', passport.authenticate('jwt'), NewsController.newPost)
router.post('/myposts', passport.authenticate('jwt'), NewsController.getMyPosts)

module.exports = router