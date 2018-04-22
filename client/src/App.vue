<template>
  <div id="app">
    <!-- <transition name="fade"> -->
      <router-view/>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    this.$store.dispatch('tryAutoLogin')
  },
  sockets: {
    connect () {
      this.$socket.emit('storeClientInfo', {_id: this.$store.getters.user._id})
      console.log('I\'M CONNECTED MATE!')
    },
    incomingFriend (data) {
      console.log('RECEIVED REQUEST')
      this.$store.dispatch('incomingFriend', data)
    },
    incomingFriendCancel (data) {
      console.log('RECEIVED CANCEL')
      this.$store.dispatch('incomingFriendCancel', data)
    },
    incomingFriendAccept (data) {
      console.log('RECEIVED ACCEPTED')
      this.$store.dispatch('incomingFriendAccept', data)
    },
    incomingFriendDecline (data) {
      console.log('RECEIVED DECLINE')
      this.$store.dispatch('incomingFriendDecline', data)
    },
    incomingFriendRemove (data) {
      console.log('RECEIVED REMOVE')
      this.$store.dispatch('incomingFriendRemove', data)
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  min-height: 100vh;
  background: #000;
  /* background: linear-gradient(to bottom, #485563, #29323c);
  background: linear-gradient(to top, #000000, #53346d);
  background: linear-gradient(to top, #141e30, #243b55); */
}

a {
  outline: 0;
}
</style>
