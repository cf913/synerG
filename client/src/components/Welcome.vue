<template>
  <div class="players">
    <h1 class="py-3">Welcome</h1>
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
    background: #222;
    min-height: 80vh;
    color: white;
  }
</style>