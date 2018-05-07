<template>
<div class="header">

  <b-navbar class="py-2 fixed-top" toggleable="md" type="dark">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand to="/">SynerG<span class="beta">BETA</span></b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav class="mobileOnly my-3">
        <b-nav-item class="tab" :to="{ name: 'main'}" exact :disabled="!auth"><i class="fa fa-newspaper-o"></i> News Feed</b-nav-item>
        <b-nav-item class="tab" :to="{ name: 'signals'}" exact :disabled="!auth"><i class="fa fa-podcast"></i> Signals</b-nav-item>
        <b-nav-item class="tab" :to="{ name: 'playerDetails', params: { id: user ? user._id : '' }}" :disabled="!auth"><i class="fa fa-user-circle-o"></i> Profile</b-nav-item>
        <b-nav-item class="tab" :to="{ name: 'myTeams'}" :disabled="!auth"><i class="fa fa-group"></i> Teams</b-nav-item>
        <b-nav-item class="tab" :to="{ name: 'myFriends'}" :disabled="!auth">
          <i class="fa fa-address-book"></i> Friends
          <!-- <div class="notification" v-if="auth && notif_friends > 0"><p>{{notif_friends}}</p></div> -->
        </b-nav-item>
        <b-nav-item class="tab" :to="{ name: 'myMessages'}" :disabled="!auth"><i class="fa fa-comments"></i> Messages</b-nav-item>
        <b-nav-item class="tab" :disabled="!auth"><i class="fa fa-gear"></i> Settings</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <!-- <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->
  
        <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <i id="profile-logo" class="fa fa-user-circle-o"></i>
          </template>
          <div v-show="auth">
            <b-dropdown-item :to="{ path: `/players/${id}`}">Profile</b-dropdown-item>
            <b-dropdown-item @click="onLogout">Logout</b-dropdown-item>
          </div>
          <div v-show="!auth">
            <b-dropdown-item href="/auth/steam/steam">Login</b-dropdown-item>
          </div>
        </b-nav-item-dropdown>
      
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  // data: () => {
  //   return {
  //     auth: !this.$store.idToken == null
  //   }
  // },
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    },
    id () {
      if (this.$store.getters.user) {
        return this.$store.getters.user.steamId
      }
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
  .beta {
    font-size: 0.5em;
  }

  .navbar {
    /* background: rgb(10,10,100) !important; */
    /* background: linear-gradient(to bottom, rgb(0,0,0), rgba(0,0,0,.6)) !important; */
    background: rgba(0, 0, 0, 1) !important;
    background: rgba(118, 0, 0, 0.8) !important;
  }
  .navbar-brand {
    padding-left: 20px;
  }
  li.nav-item {
    padding: 0 20px;
  }
  #profile-logo {
    font-size: 1.2em;
    margin: 4px 5px 0 5px;
  }
</style>