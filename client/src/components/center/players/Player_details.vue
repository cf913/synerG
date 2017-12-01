<template>
  <div class="player_details">
    <p>{{user}}</p>
    <br><br>
    <router-link class="btn btn-primary" to="/players">Back To Playerlist</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {}
    }
  }
}
</script>

<style scoped>

</style>