<template>
  <div class="left tile gray-tile">
    <b-nav vertical>
      <b-nav-item class="tab" :to="{ name: 'main'}" exact :disabled="!isLoggedIn">
        <i class="fa fa-newspaper-o"></i>
        <span class="hide-on-small"> News Feed</span>
      </b-nav-item>
      <b-nav-item class="tab" :to="{ name: 'signals'}" exact :disabled="!isLoggedIn">
        <i class="fa fa-podcast"></i>
        <span class="hide-on-small"> Signals</span>
      </b-nav-item>
      <b-nav-item class="tab" :to="{ name: 'playerDetails', params: { id: user._id }}" :disabled="!isLoggedIn">
        <i class="fa fa-user-circle-o"></i>
        <span class="hide-on-small"> Profile</span>
      </b-nav-item>
      <b-nav-item class="tab" :to="{ name: 'myTeams'}" :disabled="!isLoggedIn">
        <i class="fa fa-group"></i>
        <span class="hide-on-small"> Teams</span>
      </b-nav-item>
      <b-nav-item class="tab" :to="{ name: 'myFriends'}" :disabled="!isLoggedIn">
        <i class="fa fa-address-book"></i>
        <span class="hide-on-small"> Friends</span>
      </b-nav-item>
      <b-nav-item class="tab" :to="{ name: 'myMessages'}" :disabled="!isLoggedIn">
        <i class="fa fa-comments"></i>
        <span class="hide-on-small"> Messages</span>
      </b-nav-item>
      <b-nav-item class="tab" :disabled="!isLoggedIn">
        <i class="fa fa-gear"></i>
        <span class="hide-on-small"> Settings</span>
      </b-nav-item>
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

@media only screen and (max-width: 991px) {

  i {
    margin: 5px 0 ;
    font-size: 1.2em;
  }
  
  .hide-on-small {
    display: none;
  }
}

@media only screen and (max-width: 812px) {
  i {
    margin-left: -5px;
    font-size: 1.2em;
  }
}
</style>
