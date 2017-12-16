<template>
  <div class="friends">
    <div class="container">
      {{friends}}
    </div>
  </div> 
</template>

<script>
export default {
  computed: {
    friends () {
      return this.$store.getters.user.friends
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
