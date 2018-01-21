<template>
  <div class="friends tile gray-tile">
    <div class="container">
      
      Requests:
      <ul>
        <li v-for="(requesterId, index) in requests" :key="index">
          {{ requesterId }} 
        </li>
      </ul>
      <hr>
      (Requests Sent:)
      <ul>
        <li v-for="(requesterId, index) in requests_sent" :key="index">
          {{ requesterId }} 
        </li>
      </ul>
      <hr>
      Friends:
      <ul>
        <li v-for="(friend, index) in friends" :key="index">
          {{ friend }} 
        </li>
      </ul>
    </div>
  </div> 
</template>

<script>
export default {
  computed: {
    requests_sent () {
      return this.$store.getters.user.friends.pending_sent
    },
    requests () {
      return this.$store.getters.user.friends.pending_received
    },
    friends () {
      return this.$store.getters.user.friends.accepted
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
