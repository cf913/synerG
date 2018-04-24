<template>
  <div class="left tile gray-tile">
    <b-nav vertical>
      <b-nav-item class="tab" :to="{ name: 'main'}" exact :disabled="!isLoggedIn"><i class="fa fa-newspaper-o"></i> News Feed</b-nav-item>
      <b-nav-item class="tab" :to="{ name: 'signals'}" exact :disabled="!isLoggedIn"><i class="fa fa-podcast"></i> Signals</b-nav-item>
      <b-nav-item class="tab" :to="{ name: 'playerDetails', params: { id: user._id }}" :disabled="!isLoggedIn"><i class="fa fa-user-circle-o"></i> Profile</b-nav-item>
      <b-nav-item class="tab" :to="{ name: 'myTeams'}" :disabled="!isLoggedIn"><i class="fa fa-group"></i> Teams</b-nav-item>
      <b-nav-item class="tab" :to="{ name: 'myFriends'}" :disabled="!isLoggedIn">
        <i class="fa fa-address-book"></i> Friends
        <div class="notification" v-if="isLoggedIn && notif_friends > 0"><p>{{notif_friends}}</p></div>
      </b-nav-item>
      <b-nav-item class="tab" :to="{ name: 'myMessages'}" :disabled="!isLoggedIn"><i class="fa fa-comments"></i> Messages</b-nav-item>
      <b-nav-item class="tab" :disabled="!isLoggedIn"><i class="fa fa-gear"></i> Settings</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: null
    }
  },
  computed: {
    user () {
      return !this.$store.getters.user ? 'No user logged in' : this.$store.getters.user
    },
    userId () {
      return this.$store.getters.userId
    },
    isLoggedIn () {
      return this.$store.getters.isAuthenticated
      // return true
    },
    notif_friends () {
      return this.$store.getters.user.friends.pending_received.length
    }
  }
}
</script>

<style scoped>
ul li {
  text-align: left;
}

.tab {
    position: relative;
  }

  .notification {
    position: absolute;
    right: 12px;
    top: 5px;
    margin: 0;
    padding: 0;
    width: 15px;
    height: 15px;
    background-color: red;
    color: white;
    border-radius: 50%;
    text-align: center;
  }

  .notification p {
    font-size: 0.8em;
    font-weight: bold;
    margin-top: -1px;
    margin-left: 0px;
  }
</style>
