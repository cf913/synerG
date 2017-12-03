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
        <!-- <transition name="bounce" mode="out-in"> -->
          <keep-alive>
            <router-view/>
          </keep-alive>
        <!-- </transition> -->
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
  components: {
    appRight: Right,
    appLeft: Left,
    appHeader: Header
  },
  created () {
    this.$store.dispatch('checkLogin', this.$route.query)
    this.$router.push('/')
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
    background: linear-gradient(to bottom, #485563, #29323c);
    background: linear-gradient(to top, #000000, #53346d);
    background: linear-gradient(to top, #141e30, #243b55);
    background: linear-gradient(to top, #000428, #004e92);

    /* background: linear-gradient(to bottom, #023, #012); */

    /* background: url('../assets/back.jpg') center no-repeat;
    background-size: cover;
    background-attachment: fixed; */
    min-height: 100vh;
    width: 100%;
  }

  .container-fluid {
    max-width: 1500px;
    padding-top: 70px;
  }
  .fixed {
    position: sticky;
    top: 90px;
  }

  .bounce-enter-active {
    animation: bounce-in-left .5s;
  }
  .bounce-leave-active {
    animation: bounce-in-right .5s reverse;
  }
  @keyframes bounce-in-left {
    from {
      transform: translateX(-2500px);
      opacity: 0
    }
    50% {
      transform: translateX(0);
      opacity: 1;
    }
    70% {
      transform: translateX(-20px);
    }
    90% {
      transform: translateX(10px);
    }
    to {
      transform: translateX(0);
    }
  }
  @keyframes bounce-in-right {
    from {
      transform: translateX(2500px);
      opacity: 0
    }
    50% {
      transform: translateX(0);
      opacity: 1;
    }
    70% {
      transform: translateX(20px);
    }
    90% {
      transform: translateX(-10px);
    }
    to {
      transform: translateX(0);
    }
  }


</style>

<style>
  .tile {
    border-radius: 5px;
  }
  .gray-tile {
    background: #111;
  }

  .tile-shadow {
    box-shadow: 0px 2px 2px #000;
  }

</style>
