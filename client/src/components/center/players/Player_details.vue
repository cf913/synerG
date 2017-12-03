<template>
  <div class="player_details">
    <div v-if="loading" class="text-center">
      <p class="lead">Fetching player profile...</p>
      <img src="../../../assets/loading.svg" alt="">
    </div>
    <p v-else>{{player}}</p>
    <br><br>
    <a class="btn btn-primary" @click="onBack">Back To Playerlist</a>
  </div>
</template>

<script>
export default {
  computed: {
    player () {
      return this.$store.getters.player
    },
    loading () {
      return this.$store.getters.player_loading
    }

  },
  methods: {
    getPlayer () {
      this.$store.dispatch('getPlayer', this.$route.params.id)
    },
    onBack () {
      this.$router.go(-1)
    }
  },
  created () {
    this.$store.dispatch('resetPlayerDetails')
    console.log('Fetching player profile...')
    this.getPlayer()
  }
}
</script>

<style scoped>

</style>