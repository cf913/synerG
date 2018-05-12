<template>
  <div v-if="messages_loading" class="loading">
      <p class="lead">Fetching messages...</p>
      <img src="../../../assets/loading.svg" alt="">
  </div>
  <div v-else class="text-left tile gray-tile" style="position: relative">
    <h5 class="title" v-if="participant.steamName !== user.steamName" v-for="(participant, index) in messages[0].conversationId.participants" :key="index">{{participant.steamName}}</h5>
    <ul class="list-group2 inner-tile" id="chat-box">
      <li 
        class="list-group-item2 left" 
        :class="{'right': message.author.steamName === user.steamName}" 
        v-for="(message, index) in messages" 
        :key="index"
      >
        <img v-if="message.author.steamName !== user.steamName" :src="message.author.img" alt="">
        <p class="blob" :class="{'blob-right': message.author.steamName === user.steamName}" >{{message.body}}</p>
      </li>
    </ul>
    <!-- {{inc}} -->
    <div class="tiled inner-tile message-input">
      <form>
        <div>
          <label class="title" for="message">Message:</label>
          <input type="text" class="form-control" id="message" name="message" v-model="message" placeholder="Write Message ...">
          <button @click.prevent="sendReply" @keyup.enter.prevent="sendReply"><i class="fa fa-arrow-right fa-fw"></i></button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      inc: 'Waiting for message...'
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    messages () {
      return this.$store.getters.messages
    },
    messages_loading () {
      return this.$store.getters.messages_loading
    }
  },
  methods: {
    sendReply () {
      const message = this.message
      const conversationId = this.$route.params.id
      const sender = this.$store.getters.user
      const author = {
        img: sender.img,
        steamName: sender.steamName,
        _id: sender._id
      }
      console.log(message)
      console.log(conversationId)
      this.$store.dispatch('sendReply', { message: { body: message, author }, conversationId })
      const participants = this.$store.getters.messages[0].conversationId.participants
      const receiverID = participants.filter(item => {
        return item._id !== this.$store.getters.user._id
      })
      console.log(receiverID[0]._id)
      console.log(this.$store.getters.user.steamName)
      this.$socket.emit('message', { sender, receiverID: receiverID[0]._id, message: { body: message, author }, socketId: this.$socket.id })
      // this.$socket.emit('message', {sender: this.$store.getters.user, receiverID: receiverID[0]._id, body: this.message, conversationId: conversationId})
      this.message = ''
    },
    getConversation () {
      this.$store.dispatch('getConversation', this.$route.params.id)
    }
  },
  sockets: {
    incoming (msg) {
      console.log(msg)
      this.$store.dispatch('incomingMessage', msg)
      // this.getConversation()
    }
  },
  activated () {
    console.log('Fetching conversation details')
    const obj = {
      socketId: this.$socket.id,
      user: this.$store.getters.user
    }
    console.log(this.$socket.id)
    this.$socket.emit('info', obj)
    this.getConversation()
  },
  updated () {
    const chatBox = document.getElementById('chat-box')
    chatBox.scrollTop = chatBox.scrollHeight
  }
}
</script>

<style scoped>
  .message_details {
    position: relative;
  }

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  h5 {
    padding-left: 10px;
    padding-top: 10px;
  }
  
  .tiled {
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }

  .message-input {
    margin-top: 10px;
  }

  label.title {
    padding-top: 5px;
    margin-bottom: 10px;
    text-align: left;
    font-size: 17px;
    font-weight: 600;
    color: #DAA520;
  }
  
  ul.list-group2 {
    margin: 0;
    padding: 0;
    padding-top: 15px;
    padding-bottom: 15px;
    list-style-type: none;
    height: 67.8vh;
    overflow-y: auto;
  }
  
  li.list-group-item2 {
    border: none;
    margin: 0;
    padding: 5px 10px;
    background: rgba(0,0,0,0);
  }

  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  img {
    margin-right: 10px;
    width: 40px;
    height: 40px;
  }

  .blob {
    margin: 0;
    display: inline-block;
    padding: 5px 10px;
    border-radius: 20px;
    color: #111;
    background: rgba(199, 199, 199, 0.8);
    word-break: break-word; 
  }

  .blob-right {
    color: #f4f4f4;
    background-color: rgba(169, 1, 1, 0.8);
  }
</style>
