let express = require('express')
let path = require('path')
let favicon = require('serve-favicon')
let logger = require('morgan')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let cors = require('cors')
let passport = require('passport')
let session = require('express-session')

let app = express()

// PASSPORT CONFIG
// require('./config/passport')(passport)
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });


// LOAD ROUTES
let players = require('./routes/api/players_routes')
let auth = require('./routes/auth/auth')


// DATABASE

// ADD OWN DB LINK
mongoose.Promise = global.Promise
mongoose.connect('mongodb://cf913:password@ds241025.mlab.com:41025/b1gv2')
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"))
db.once("open", function(callback){
  console.log("Connection Successful")
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())


// app.use(session({
//   secret: 'your secret',
//   name: 'name of session id',
//   resave: true,
//   saveUninitialized: true}));
// app.use(passport.initialize());
// app.use(passport.session());

//app.use(express.static(path.join(__dirname, 'public')))
//app.use(express.static(path.join(__dirname, 'client/dist')))

// Set our api routes
app.use('/api', players)
app.use('/auth', auth)

// Login/Home page
app.get('/home', (req, res) => {
  res.render('home')
})


// Catch all other routes and return the index file
// app.get('*', ensureAuthenticated, (req, res) => {
//   console.log('loading vue')
//   res.sendFile(path.join(__dirname, 'client/dist/index.html'))
// })


// function ensureAuthenticated(req, res, next) {
//   console.log('middle')
//   if (req.isAuthenticated()) {
//     // req.user is available for use here
//     console.log('blup')
//     return next(); }

//   // denied. redirect to login
//   res.redirect('/home')
// }

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

let port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Server listenning on port ' + port)
})
