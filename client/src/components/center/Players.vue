<template>
  <div class="players tile gray-tile">
    <h2 class="py-3">Players</h2>
      <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .players {
    min-height: 80vh;
    color: white;
  }
</style>
