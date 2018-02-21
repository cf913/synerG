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
      message: ''
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
      console.log(message)
      console.log(conversationId)
      this.$store.dispatch('sendReply', {message, conversationId})
      const participants = this.$store.getters.messages[0].conversationId.participants
      // var receiverID = '5a6d6ef80577a7001430da2e' //  b1g
      // var receiverID = '5a85e96ffe71681af8e8568d' //  b2g
      const receiverID = participants.filter(item => {
        return item._id !== this.$store.getters.user._id
      })
      console.log(receiverID[0]._id)
      this.$socket.emit('message', {sender: this.$store.getters.user, receiverID: receiverID[0]._id, message: this.message})
    },
    getConversation () {
      this.$store.dispatch('getConversation', this.$route.params.id)
    }
  },
  socket: {
    events: {
      incoming (msg) {
        console.log('Something changed: ' + msg)
        this.getConversation()
      }
    }
  },
  activated () {
    console.log('Fetching conversation details')
    var obj = {
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
