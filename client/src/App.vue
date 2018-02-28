<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
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
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s
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
  color: #2c3e50;
  min-height: 100vh;
  background: linear-gradient(to top, #000428, #004e92);
  background: linear-gradient(to bottom, #485563, #29323c);
  background: linear-gradient(to top, #000000, #53346d);
  background: linear-gradient(to top, #141e30, #243b55);
}

a {
  outline: 0;
}
</style>
