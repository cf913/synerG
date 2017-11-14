<template>
<div class="main">
  <app-header></app-header>

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
import Right from './sidebars/right/Right'
import Left from './sidebars/left/Left'
import Header from './Header'

export default {
  name: 'Main',
  data () {
    return {
      msg: 'YAAAAAAAAAAAAAAAAAAAAAAAAYYYYYYYYYY'
    }
  },
  components: {
    appRight: Right,
    appLeft: Left,
    appHeader: Header
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .left, .center, .right {
    padding: 10px;
    padding-top: 20px;
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
