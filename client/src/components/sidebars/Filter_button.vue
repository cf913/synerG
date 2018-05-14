<template>
   <button class="filter-button mobileOnly" @click="$emit('clicked')">
      <ul>
        <li>F</li>
        <li>I</li>
        <li>L</li>
        <li>T</li>
        <li>E</li>
        <li>R</li>
      </ul>
    </button>
</template>

<script>
export default {
}
</script>


<style>
  .filter-button {
    color: white;
    text-align: center;
    background-color: rgba(118, 0, 0, 1 );
    position: fixed;
    top: 30%;
    right: 0;
    z-index: 1000;
    border: none;
    border-radius: 5px 0 0 5px;
    transform: translateY(-50%);
  }

  .filter-button ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .filter-button ul li {
    font-weight: 600;
    padding: 0;
  }
</style>

