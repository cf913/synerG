<template>
  <div class="message_new text-left tile gray-tile" style="position: relative">
    <h5 class="title">{{player.steamName}}</h5>
    <div class="inner-tile message-new">
      <h6 class="title">You have no messages with this player yet</h6>
    </div>
    <div class="tiled inner-tile message-input">
      <form>
        <div>
          <label class="title" for="message">Message:</label>
          <input type="text" class="form-control" id="message" name="message" v-model="message" placeholder="Write Message ...">
          <button @click.prevent="newConversation" @keyup.enter.prevent="newConversation"><i class="fa fa-arrow-right fa-fw"></i></button>
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
    player () {
      return this.$store.getters.player
    }
  },
  methods: {
    getPlayer () {
      this.$store.dispatch('getPlayer', this.$route.params.recipient)
    },
    newConversation () {
      const recipient = this.$store.getters.player._id
      const message = this.message
      console.log(message)
      console.log(recipient)
      this.$store.dispatch('newConversation', {message, recipient})
    }
  },
  activated () {
    this.$store.dispatch('resetPlayerDetails')
    console.log('Fetching recipient details')
    this.getPlayer()
  }
}
</script>

<style scoped>
  .tiled {
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }

  h5 {
    padding-left: 10px;
    padding-top: 10px;
  }

  div.message-new {
    margin: 0;
    padding: 0;
    padding-top: 15px;
    padding-bottom: 15px;
    list-style-type: none;
    height: 73vh;
    overflow-y: auto;
  }

  h6 {
    text-align: center;
    vertical-align: middle;
  }

  .message-input {
    margin-top: 10px;
  }
</style>
