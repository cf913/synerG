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
//let socket = require('./controllers/socket_controller')
require('module-alias/register')

let app = express()
let server = require('http').Server(app)
let io = require('socket.io')(server)

let sockets = {}
let clients = {}

io.on('connection', function (socket) {
  console.log('client connected : socket ' + socket.id)
  socket.on('disconnect', function () {
    console.log('client disconnected : socket ' + socket.id)
    delete sockets[socket.id]
    // console.log(sockets)
    if (Object.keys(clients).length === 0) clients = {}
  })

  socket.on('storeClientInfo', data => {
    clients[data._id] = socket.id
    console.log(clients)
    socket._id = data._id
    sockets[socket.id] = socket
  })
    /** subscribe to change feeds */
  // let subscribe = new Subscribe(socket)

  // socket.on('info',function(obj)
  // {
  //   console.log('info about user received '+ obj)
  //   if(socket.id === obj.socketId)
  //   {
  //     socket.user = obj.user
  //   }
  // })
  socket.on('message', function (obj) {
    console.log('receiver : '+ obj.receiverID)
    console.log('current socket : '+ socket.id)
    console.log('receivers socket: ' + obj.socketId)
    //console.log(socket)
    // socket.emit('incoming', 'incoming message')    
    // if (socket.user._id === obj.receiverID) {
    console.log('receiver socket: ' + clients[obj.receiverID])
      //socket.emit('incoming', 'WE HAVE INCOMING!!')
      socket.to(clients[obj.receiverID]).emit('incoming', obj.message)
      // subscribe.notify(obj.sender, obj.receiverID, obj.message)
      console.log(obj.sender._id + ' sent a message to ' + obj.receiverID)
    // }
  })

  socket.on('friends_request', function (data) {
    const { _id, steamId, steamName, img } = data.sender
    const sender = { _id, steamId, steamName, img }
    socket.to(clients[data.receiverID]).emit('incomingFriend', sender)
  })
  socket.on('friends_cancel', function (data) {
    const { _id, steamId, steamName, img } = data.sender
    const sender = { _id, steamId, steamName, img }
    socket.to(clients[data.receiverID]).emit('incomingFriendCancel', sender)
  })
  socket.on('friends_accept', function (data) {
    const { _id, steamId, steamName, img } = data.sender
    const sender = { _id, steamId, steamName, img }
    socket.to(clients[data.receiverID]).emit('incomingFriendAccept', sender)
  })
  socket.on('friends_decline', function (data) {
    const { _id, steamId, steamName, img } = data.sender
    const sender = { _id, steamId, steamName, img }
    socket.to(clients[data.receiverID]).emit('incomingFriendDecline', sender)
  })
  socket.on('friends_remove', function (data) {
    const { _id, steamId, steamName, img } = data.sender
    const sender = { _id, steamId, steamName, img }
    socket.to(clients[data.receiverID]).emit('incomingFriendRemove', sender)
  })
})

// function Subscribe (socket) {
//   this.notify = function (sender, receiverID, message) {
//     console.log('EMITTING MESSAGE')
//     socket.emit('incoming', message)
//   }
// }



// PASSPORT CONFIG
require('./config/passportJWT')(passport)
require('./config/passportSTEAM')(passport)
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');


// LOAD ROUTES
let authJWT = require('./routes/auth/authJWT')
let authSteam = require('./routes/auth/authSteam')
let news = require('./routes/api/news_routes')
let players = require('./routes/api/players_routes')
let friends = require('./routes/api/friends_routes')
let teams = require('./routes/api/teams_routes')
let communities = require('./routes/api/community_routes')
let messages = require('./routes/api/messages_routes')


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use(passport.initialize())

app.use(express.static(path.join(__dirname, 'client/dist')))
// app.use(express.static(path.join(__dirname, 'public')))

// Set our api routes
app.use('/api/news', news)
app.use('/api/players', players)
app.use('/api/friends', friends)
app.use('/api/teams', teams)
app.use('/api/communities', communities)
app.use('/api/messages', messages)
app.use('/auth/jwt', authJWT)
app.use('/auth/steam', authSteam)

// Login/Home page
// app.get('/', (req, res) => {
//   res.render('index')
// })

// app.get('/', (req, res) => {
//   console.log('accessing app...')
//   res.sendFile(path.join(__dirname, 'client/dist/index.html'))
// })

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

// io.on('connection', function (socket) {
//   sockets.push(socket)
//   console.log('client connected : socket ' + socket.id)
//   socket.on('disconnect', function () {
//     console.log('client disconnected : socket ' + socket.id)
//   })
//   socket.on('message', function (msg) {
//     io.emit('message', msg)
//   })
// })

// app.start = app.listen = function(){
//   return server.listen.apply(server, arguments)
// }

// app.start(3000)

server.listen(port, () => {
  console.log('Server listenning on port ' + port)
})