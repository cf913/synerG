<template>
  <div class="players">
    <h2 class="py-3">Welcome</h2>
      <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .players {
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-self: center;
    background: #222;
    min-height: 80vh;
    color: white;
  }
</style>