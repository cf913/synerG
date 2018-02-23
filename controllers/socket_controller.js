const server = require('http').createServer();
const io = require('socket.io')(server);
const sockets = []

io.on('connection', function (socket) {
  sockets.push(socket)
  console.log('client connected : socket ' + socket.id)

  socket.on('disconnect', function () {
    console.log('client disconnected : socket ' + socket.id)
    var index = sockets.indexOf(socket)
    sockets.splice(index, 1)
  })

    /** subscribe to change feeds */
  subscribe = new Subscribe(socket)

  socket.on('info',function(obj)
  {
    console.log('info about user received '+ obj)
    if(socket.id === obj.socketId)
    {
      socket.user = obj.user
    }
  })
  socket.on('message', function (obj) {
    console.log('receiver : '+obj.receiverID)
    console.log('current socket : '+ socket.user._id)    
    if (socket.user._id === obj.receiverID) {
      subscribe.notify(obj.sender, obj.receiverID, obj.message)
      console.log(obj.sender._id + ' sent a message to ' + obj.receiverID)
    }
  })
})

function Subscribe (socket) {
  this.notify = function (sender, receiverID, message) {
    socket.emit('incoming', message)
  }
}
module.exports = server