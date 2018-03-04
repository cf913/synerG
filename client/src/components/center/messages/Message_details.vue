<template>
  <div class="message_details text-left container tile gray-tile tile-shadow" style="position: relative">
    <div class="tiled inner-tile">
      <p>Name of recipient</p>
    </div>
    <div class="tiled inner-tile">
      <ul class="list-group clearfix" v-for="(message, index) in messages" :key="index">
        <li class="list-group-item inner-tile">{{message.author.steamName}} sent {{message.body}}</li>
      </ul>
    </div>
    {{inc}}
    <div class="tiled inner-tile">
      <form>
        <div>
          <label class="col-form-label" for="message">Message:</label>
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
    messages () {
      return this.$store.getters.messages
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
  }
}
</script>

<style scoped>
  .tiled {
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
</style>
