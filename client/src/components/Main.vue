<template>
<div class="main">
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
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
</nav>

  <!-- Components News/Players/Teams -->
  <div class="container-fluid">
    <div class="row">
      <div class="left col-md-4 col-lg-3 sidebar">
        <div class="">
          <app-left></app-left>
        </div>
      </div>
      <div class="center col-md-8 col-lg-6">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
      <div class="right col-lg-3">
        <div class="fixed">
          <app-right></app-right>
        </div>
      </div>
    </div>
  </div>
  
</div>
</template>

<script>
import Right from './sidebars/right/Right.vue'
import Left from './sidebars/left/Left.vue'

export default {
  name: 'Main',
  data () {
    return {
      msg: 'YAAAAAAAAAAAAAAAAAAAAAAAAYYYYYYYYYY'
    }
  },
  components: {
    appRight: Right,
    appLeft: Left
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  li.nav-item {
    padding: 0 20px;
  }

  .left, .center, .right {
    padding: 10px;
  }
  .left {
    padding-left: 20px;
  }
  .right {
    padding-right: 20px;
  }
  

  .main {
    background: black;
    /* background: url('../assets/back.jpg') center no-repeat;
    background-size: cover;
    background-attachment: fixed; */
    min-height: 100vh;
    width: 100%;
  }

  .container-fluid {
    padding-top: 70px;
  }
  .fixed {
    position: sticky;
    top: 80px;
  }

</style>
