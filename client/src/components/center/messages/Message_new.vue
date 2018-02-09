<template>
  <div class="message_details text-left container tile gray-tile tile-shadow" style="position: relative">
    <div class="tiled inner-tile">
      <p>{{player.steamName}}</p>
    </div>
    <div class="tiled inner-tile">
      <p>Messages should appear here</p>
    </div>
    <div class="tiled inner-tile">
      <form>
        <div class="tiled inner-tile">
          <h5 class="label">Message:</h5>
          <b-form-textarea class="message"
            v-model="message"
            placeholder="Write message..."
            :rows="3"
            :max-rows="6">
          </b-form-textarea>
          <button @click.prevent="newConversation"><i class="fa fa-arrow-right fa-fw"></i></button>
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
</style>
