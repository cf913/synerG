const Conversation = require('@models/conversation')
const Message = require('@models/message')
const Player = require('@models/player')
const request = require('request-promise')
const config = require('@config')
const jwt = require('jsonwebtoken')

module.exports = {
  
  getConversations(req, res, next) {  
    // Only return one message from each conversation to display as snippet
    Conversation.find({participants: req.body.userId})
    .select('_id')
    .sort('-createdAt')
    .then(conversations => {
      console.log(conversations)
      if(conversations.length===0) {
        return res.status(200).json({ message: "No conversations yet" })
      } else {
        let fullConversations = []
        conversations.forEach(conversation => {
          Message.findOne({ 'conversationId': conversation._id })
          .sort('-createdAt')
          .populate([{path: 'author', model: Player, select: '_id img steamName'}, {path: 'conversationId', model: Conversation, populate: {path: 'participants', model: Player, select: '_id img steamName'}}])
          .then(message => {
            fullConversations.push(message)
            if(fullConversations.length === conversations.length) {
              // sorts conversations by updated date
              fullConversations.sort((a, b) => {
                a = new Date(a.updatedAt)
                b = new Date(b.updatedAt)
                return a>b ? -1 : a<b ? 1 : 0
               })
              res.send(fullConversations)
            }
          })
          .catch(err => {
            console.log('This is error message')
            res.send(err)
          })
        })
      }
    })
    .catch(err => {
      console.log('This is error message')
      res.send(err)
    })
  },
  
  getConversation(req, res, next) {  
    Message.find({ conversationId: req.params.id })
    .select('createdAt body author coversationId')
    .sort({createdAt: 'ascending'})
    .populate([{path: 'author', model: Player, select: '_id img steamName'}, {path: 'conversationId', model: Conversation, populate: {path: 'participants', model: Player, select: '_id img steamName'}}])
    .then(messages => {
      console.log('back: ' + messages.length)
      res.send(messages)
    })
    .catch(err => {
      console.log('request failed')
      res.send(err)
    })
  },
  
  checkConversation(req, res, next) {
    Conversation.findOne({$and: [{participants: req.body.user}, {participants: req.body.recipient}]})
    .then(conversation => {
      if(conversation===null) {
        return res.status(200).json({message: "No conversation yet"})
      } else {
        console.log('need new conversation')
        res.send(conversation)
      }
    })
    .catch(err => {
      res.send(err)
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
  }
  
  // deleteConversation(req, res, next) {  
  //   Conversation.findOneAndRemove({
  //     $and : [
  //             { '_id': req.params.conversationId }, { 'participants': req.user._id }
  //           ]}, function(err) {
  //         if (err) {
  //           res.send({ error: err });
  //           return next(err);
  //         }
  //         res.status(200).json({ message: 'Conversation removed!' });
  //         return next();
  //   });
  // },
  
  // updateMessage(req, res, next) {  
  //   Conversation.find({
  //     $and : [
  //             { '_id': req.params.messageId }, { 'author': req.user._id }
  //           ]}, function(err, message) {
  //         if (err) {
  //           res.send({ error: err});
  //           return next(err);
  //         }
  
  //         message.body = req.body.composedMessage;
  
  //         message.save(function (err, updatedMessage) {
  //           if (err) {
  //             res.send({ error: err });
  //             return next(err);
  //           }
  
  //           res.status(200).json({ message: 'Message updated!' });
  //           return next();
  //         });
  //   });
  // }
}