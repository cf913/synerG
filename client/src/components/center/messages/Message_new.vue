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
        <div>
          <label class="col-form-label" for="message">Message:</label>
          <input type="text" class="form-control" id="message" name="message" v-model="message" placeholder="Write Message ...">
          <button><i class="fa fa-arrow-right fa-fw"></i></button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    player () {
      return this.$store.getters.player
    }
  },
  methods: {
    getPlayer () {
      this.$store.dispatch('getPlayer', this.$route.params.recipient)
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
