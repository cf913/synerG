<template>
  <div class="players tile gray-tile">
    <h2 class="py-3">Welcome to SynerG</h2>
      <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .players {
    display: flex;
    justify-content: center;
    align-self: center;
    min-height: 80vh;
    color: white;
  }
</style>