<template>
   <button class="filter-button mobileOnly" @click="$emit('clicked')">
      <i class="fa fa-gears fa-fw"></i>
    </button>
</template>

<script>
export default {
}
</script>


<style scoped>
  i {
    font-size: 1.6em;
  }
  .filter-button {
    color: white;
    text-align: center;
    background-color: rgba(118, 0, 0, 1 );
    position: fixed;
    width: 50px;
    height: 50px;
    padding: 10px 0;
    bottom: 45px;
    right: 20px;
    z-index: 1000;
    border: none;
    border-radius: 50%;
    transform: translateY(-50%);
    z-index: 998;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

