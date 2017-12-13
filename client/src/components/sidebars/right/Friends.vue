<template>
  <div class="friends">
    <div class="container">
      <div v-for="(friend, index) in friends" :key="index">
        <p>{{friend}}</p>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  computed: {
    friends () {
      // return !this.$store.getters.user ? 'No user logged in' : this.$store.getters.user.friends
    },
    isLoggedIn () {
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
