<template>
  <div class="friends">
    <div v-if="isLoggedIn" class="container">
       {{user}}

    </div>
  </div> 
</template>

<script>
export default {
  computed: {
    user () {
      return !this.$store.getters.user ? 'No user logged in' : this.$store.getters.user
    },
    isLoggedIn () {
      return true // this.$store.getters.isAuthenticated
    }
  },
  methods: {
    getSteamInfo () {
    }
  }
}
</script>

<style scoped>

</style>
