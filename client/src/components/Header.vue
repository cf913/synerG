<template>
<div class="header">

  <b-navbar class="py-3 fixed-top" toggleable="md" type="dark" style="background: rgba(0,0,0,0.5)">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand to="/">SynerG</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item to="/news">News</b-nav-item>
        <b-nav-item to="/players">Players</b-nav-item>
        <b-nav-item to="/teams">Teams</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
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
            <span>User </span>
          </template>
          <div v-show="isLoggedIn">
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Signout</b-dropdown-item>
          </div>
          <div v-show="!isLoggedIn">
            <b-dropdown-item to="/login">Login</b-dropdown-item>
            <b-dropdown-item to="/register">Sign up!</b-dropdown-item>
          </div>
        </b-nav-item-dropdown>
      
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { eventBus } from '../main'

export default {
  data: () => {
    return {
      isLoggedIn: false
    }
  },
  created () {
    eventBus.$on('loggedIn', status => {
      this.isLoggedIn = status
    })
  }
}
</script>

<style scoped>

  .navbar {
    background: darkblue !important;
  }
  .navbar-brand {
    padding-left: 20px;
  }
  li.nav-item {
    padding: 0 20px;
  }
</style>