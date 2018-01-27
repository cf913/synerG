<template>
<div class="header">

  <b-navbar class="py-2 fixed-top" toggleable="md" type="dark" style="background: rgba(0,0,0,0.5)">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand to="/">SynerG</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item to="/news">DotA 2</b-nav-item>
        <b-nav-item to="/players">CS:GO</b-nav-item>
        <b-nav-item to="/teams">League of Legends</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <!-- <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->
  <!--
        <b-nav-item-dropdown text="Lang" right>
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
  //     isLoggedIn: !this.$store.idToken == null
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

  .navbar {
    /* background: rgb(10,10,100) !important; */
    background: linear-gradient(to bottom, rgb(0,0,0), rgba(0,0,0,.6)) !important;
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