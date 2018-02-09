<template>
  <div class="message_details text-left container tile gray-tile tile-shadow" style="position: relative">
    <div class="tiled inner-tile">
      <p>Name of recipient</p>
    </div>
    <div class="tiled inner-tile">
      <p>{{messages}}</p>
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
    messages () {
      return this.$store.getters.messages
    }
  },
  methods: {
    getConversation () {
      this.$store.dispatch('getConversation', this.$route.params.id)
    }
  },
  activated () {
    console.log('Fetching conversation details')
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
