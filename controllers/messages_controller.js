const Conversation = require('@models/conversation')
const Message = require('@models/message')
const Player = require('@models/player')
const request = require('request-promise')
const config = require('@config')
const jwt = require('jsonwebtoken')

module.exports = {
  
  getConversations(req, res, next) {  
    // Only return one message from each conversation to display as snippet
    Conversation.find({ participants: req.user._id })
    .select('_id')
    .exec(function(err, conversations) {
    if (err) {
      res.send({ error: err })
      return next(err)
    }
    if(conversations.length===0) {
      return res.status(200).json({ message: "No conversations yet" })
    }
    // Set up empty array to hold conversations + most recent message
    let fullConversations = []
    conversations.forEach(function(conversation) {
      Message.find({ 'conversationId': conversation._id })
        .sort('-createdAt')
        .limit(1)
        .populate({
          path: "author",
          select: "profile.firstName profile.lastName"
        })
        .exec(function(err, message) {
          if (err) {
            res.send({ error: err })
            return next(err)
          }
          fullConversations.push(message)
          if(fullConversations.length === conversations.length) {
            return res.status(200).json({ conversations: fullConversations })
          }
        })
      })
    })
  },
  
  getConversation(req, res, next) {  
    Message.find({ conversationId: req.params.id })
    .select('createdAt body author')
    .sort('-createdAt')
    .populate({path: 'author', model: Player, select: '_id img steamName steam'})
    .exec((err, messages) => {
      if (err) {
        res.send({ error: err })
        return next(err)
      }
    })
    .then(messages => {
      console.log(messages)
      res.send(messages)
    })
    .catch(err => {
      console.log(err)
    })
  },
  
  checkConversation(req, res, next) {
    Conversation.findOne({$and: [{participants: req.body.user}, {participants: req.body.recipient}]})
    // .select('_id')
    .exec((err, conversations) => {
      console.log(conversations)
      if (err) {
        return console.log(err)
      }
      if(conversations===null) {
        return res.status(200).json({ message: "No conversation yet" })
        // return console.log('nothing')
      } else {
        res.send(conversations)
      }
    })
    .then(conversation => {
      console.log('need new conversation')
      res.send(conversation)
    })
    .catch(err => {
      console.log(err)
    })
  },
  
  newConversation(req, res, next) {
    if(!req.body.message) {
      res.status(422).send({ error: 'Please enter a message.' })
      return
    }
    const conversation = new Conversation({
      participants: [req.body.sender, req.body.recipient]
    })
    conversation.save()
    .then(newConversation => {
      console.log('New conversation created')
      console.log(newConversation)
      const message = new Message({
        conversationId: newConversation._id,
        body: req.body.message,
        author: req.body.sender
      })
      message.save()
      .then(message => {
        console.log('Here is the message')
        console.log(message)
        res.send(message)
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  
  sendReply(req, res, next) {  
    const reply = new Message({
      conversationId: req.params.id,
      body: req.body.message,
      author: req.body.sender
    })
    reply.save()
    .then(message => {
      console.log('Reply sent')
      console.log(message)
      res.send(message)
    })
    .catch(err => {
      console.log(err)
    })
  },
  
  deleteConversation(req, res, next) {  
    Conversation.findOneAndRemove({
      $and : [
              { '_id': req.params.conversationId }, { 'participants': req.user._id }
            ]}, function(err) {
          if (err) {
            res.send({ error: err });
            return next(err);
          }
          res.status(200).json({ message: 'Conversation removed!' });
          return next();
    });
  },
  
  updateMessage(req, res, next) {  
    Conversation.find({
      $and : [
              { '_id': req.params.messageId }, { 'author': req.user._id }
            ]}, function(err, message) {
          if (err) {
            res.send({ error: err});
            return next(err);
          }
  
          message.body = req.body.composedMessage;
  
          message.save(function (err, updatedMessage) {
            if (err) {
              res.send({ error: err });
              return next(err);
            }
  
            res.status(200).json({ message: 'Message updated!' });
            return next();
          });
    });
  }
}