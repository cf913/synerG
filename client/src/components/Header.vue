<template>
<div class="header">

  <b-navbar class="py-2 fixed-top" toggleable="md" type="dark">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand to="/">SynerG<span class="beta">BETA</span></b-navbar-brand>

    <router-link
      class="mobileOnly"
      :class="{hidden: expanded}" 
      :to="{ name: 'playerDetails', params: { id: user ? user._id : '' }}" 
      :disabled="!isLoggedIn"  
      style="height: 30px; width: 30px; border-radius: 50%; overflow: hidden;">
      <img 
        :src="user ? user.img : ''" 
        alt="" 
        style="height: 100%; width: 100%;">
    </router-link>

    <b-collapse is-nav id="nav_collapse">
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
            <b-dropdown-item :to="{ name: 'playerDetails', params: { id: user ? user._id : '' }}">Profile</b-dropdown-item>
            <b-dropdown-item>Settings</b-dropdown-item>
            <b-dropdown-item @click="onLogout">Logout</b-dropdown-item>
          </div>
          <div v-show="!auth">
            <b-dropdown-item href="/auth/steam/steam">Login</b-dropdown-item>
          </div>
        </b-nav-item-dropdown>
      
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>

  <div class="bot-nav mobileOnly">
    <ul>
      <router-link :to="{ name: 'main'}" exact :disabled="!auth"><i class="fa fa-newspaper-o"></i></router-link>
      <router-link :to="{ name: 'signals'}"  :disabled="!auth"><i class="fa fa-podcast"></i></router-link>
      <router-link :to="{ name: 'myMessages'}"  :disabled="!auth"><i class="fa fa-comments"></i></router-link>
      <router-link :to="{ name: 'myTeams'}"  :disabled="!auth"><i class="fa fa-group"></i></router-link>
      <router-link :to="{ name: 'myFriends'}"  :disabled="!auth"><i class="fa fa-address-book"></i></router-link>
    </ul>
  </div>
  
  <!-- <b-navbar class="py-2 fixed-bottom mobileOnly" toggleable="false" type="dark">
    <b-navbar-nav class="bot-nav">
        <b-nav-item class="tab" :to="{ name: 'main'}" exact :disabled="!auth"><i class="fa fa-newspaper-o"></i></b-nav-item>
        <b-nav-item class="tab" :to="{ name: 'signals'}" exact :disabled="!auth"><i class="fa fa-podcast"></i></b-nav-item>
        <b-nav-item class="tab" :to="{ name: 'playerDetails', params: { id: user ? user._id : null }}" :disabled="!auth"><i class="fa fa-user-circle-o"></i></b-nav-item>
        <b-nav-item class="tab" :to="{ name: 'myTeams'}" :disabled="!auth"><i class="fa fa-group"></i></b-nav-item>
        <b-nav-item class="tab" :to="{ name: 'myFriends'}" :disabled="!auth">
          <i class="fa fa-address-book"></i>
        </b-nav-item>
        <b-nav-item class="tab" :to="{ name: 'myMessages'}" :disabled="!auth"><i class="fa fa-comments"></i></b-nav-item>
        <b-nav-item class="tab" :disabled="!auth"><i class="fa fa-gear"></i></b-nav-item>
      </b-navbar-nav>
  </b-navbar> -->
</div>
</template>

<script>
export default {
  data: () => {
    return {
      expanded: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
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

  .bot-nav {
    color: white;
    position: fixed;
    z-index: 40;
    left: 0;
    bottom: 0;
    height: 50px;
    width: 100%;
    background-color: rgba(118, 0, 0, 1 ); 
  } 
  .bot-nav ul {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  .bot-nav a {
    flex: 1;
    display: inline-block;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
  }

  .bot-nav a {
    text-decoration: none;
    color: rgba(0,0,0,0.5) !important;
    font-size: 1.3em;
    width: 100%;
    height: 100%;
  }

  .bot-nav a:hover {
    background: rgba(0,0,0,0.1);
  }

  .bot-nav a.router-link-exact-active {
    color: white !important;
    border-bottom: 4px solid #DAA520;
    transition: 0.2s;
  }

  .bot-nav a.router-link-exact-active i {
    transform: scale(1.2);
  }

  .hidden {
    display: none;
  }
</style>