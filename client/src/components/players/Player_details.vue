<template>
  <div class="player_details">
    <p>{{player}}</p>
    <br><br>
    <button class="btn btn-primary" @click="$emit('toPlayerList', false)">Back To Playerlist</button>
  </div>
</template>

<script>
export default {
  props: ['player']
}
</script>

<style scoped>

</style>