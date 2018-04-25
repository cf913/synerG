<template>
  <div class="left tile gray-tile">
    <b-nav vertical>
      <b-nav-item class="tab" :to="{ name: 'main'}" exact :disabled="!isLoggedIn"><i class="fa fa-newspaper-o"></i> News Feed</b-nav-item>
      <b-nav-item class="tab" :to="{ name: 'signals'}" exact :disabled="!isLoggedIn"><i class="fa fa-podcast"></i> Signals</b-nav-item>
      <b-nav-item class="tab" :to="{ name: 'playerDetails', params: { id: user._id }}" :disabled="!isLoggedIn"><i class="fa fa-user-circle-o"></i> Profile</b-nav-item>
      <b-nav-item class="tab" :to="{ name: 'myTeams'}" :disabled="!isLoggedIn"><i class="fa fa-group"></i> Teams</b-nav-item>
      <b-nav-item class="tab" :to="{ name: 'myFriends'}" :disabled="!isLoggedIn">
        <i class="fa fa-address-book"></i> Friends
        <!-- <div class="notification" v-if="isLoggedIn && notif_friends > 0"><p>{{notif_friends}}</p></div> -->
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

.left.tile {
  padding: 0;
}

.tab {
  position: relative;
}

i {
  margin-right: 5px;
}

li.nav-item a.nav-link {
  border-left: 4px solid transparent;
  transition: 0.2s;
}
li.nav-item a.nav-link:hover {
  background: rgba(0,0,0,0.2);
}

li.nav-item a.nav-link.active {
  border: none;
  background: rgba(0,0,0,0.4);
  border-left: 4px solid #9e0003;
}

li.nav-item:first-child a.nav-link.active {
  border-radius: 5px 5px 0 0;
}

li.nav-item:last-child a.nav-link.active {
  border-radius: 0 0 5px 5px;
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
