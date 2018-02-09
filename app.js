let express = require('express')
let path = require('path')
let favicon = require('serve-favicon')
let logger = require('morgan')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let cors = require('cors')
let passport = require('passport')
let jwt = require('jsonwebtoken')
let config = require('./config/index.js')
let database = require('./config/database')(mongoose, config)
require('module-alias/register')

let app = express()

// PASSPORT CONFIG
require('./config/passportJWT')(passport)
require('./config/passportSTEAM')(passport)
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


// LOAD ROUTES
let authJWT = require('./routes/auth/authJWT')
let authSteam = require('./routes/auth/authSteam')
let players = require('./routes/api/players_routes')
let friends = require('./routes/api/friends_routes')
let teams = require('./routes/api/teams_routes')
let messages = require('./routes/api/messages_routes')


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use(passport.initialize())

//app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'client/dist')))

// Set our api routes
app.use('/api/players', players)
app.use('/api/friends', friends)
app.use('/api/teams', teams)
app.use('/api/messages', messages)
app.use('/auth/jwt', authJWT)
app.use('/auth/steam', authSteam)

// Login/Home page
app.get('/home', (req, res) => {
  res.render('home')
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'))
})

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.redirect('/')
})


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   let err = new Error('Not Found')
//   err.status = 404
//   next(err)
// })

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   // render the error page
//   res.status(err.status || 500)
//   res.render('error')
// })

let port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Server listenning on port ' + port)
})
