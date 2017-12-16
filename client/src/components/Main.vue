<template>
<div class="main">
  <app-header></app-header>

  <!-- Components News/Players/Teams -->
  <div class="container-fluid">
    <div class="row">
      <div class="left col-md-4 col-lg-3 sidebar">
        <div class="">
          <transition name="bounce" mode="out-in">
            <keep-alive>
              <router-view name="left"/> 
            </keep-alive>
          </transition>
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
import Header from './Header'

export default {
  name: 'Main',
  components: {
    appRight: Right,
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
    /* background: linear-gradient(to top, #000000, #53346d);
    background: linear-gradient(to bottom, #159957, #155799);
    background: linear-gradient(to bottom, #007991, #78ffd6);
    background: linear-gradient(to top, #200122, #6f0000);
    background: linear-gradient(to top, #000428, #004e92);
    background: linear-gradient(to top, #3a7bd5, #3a6073);
    background: linear-gradient(to top, #000000, #434343);
    background: linear-gradient(to top, #2980b9, #2c3e50);
    background: linear-gradient(to top, #4b79a1, #283e51);
    background: linear-gradient(to bottom, #485563, #29323c); */
    background: linear-gradient(to top, #141e30, #243b55);

    /* background: linear-gradient(to bottom, #023, #012); */

    /* background: url('../assets/back.jpg') center no-repeat;
    background-size: cover;
    background-attachment: fixed; */
    min-height: 100vh;
    width: 100%;
  }

  .container-fluid {
    max-width: 1500px;
    padding-top: 55px;
  }
  .fixed {
    position: sticky;
    top: 75px;
  }

  .bounce-enter-active {
    animation: bounce-in-top .5s cubic-bezier(.11,.67,.07,.97);
  }
  .bounce-leave-active {
    animation: bounce-in-bot .5s reverse cubic-bezier(.11,.67,.07,.97);
  }
  @keyframes bounce-in-top {
    from {
      transform: translateY(-1000px);
      opacity: 0
    }
    /* 50% {
      transform: translateY(0);
      opacity: 1;
    }
    70% {
      transform: translateY(-20px);
    }
    90% {
      transform: translateY(10px);
    } */
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes bounce-in-bot {
    from {
      transform: translateY(1000px);
      opacity: 0
    }
    10% {
      opacity: 1;
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes bounce-in-left {
    from {
      transform: translateX(-2500px);
      opacity: 0
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
      transform: translateX(-20px);
    }
    90% {
      transform: translateX(10px);
    }
    to {
      transform: translateX(0);
    }
  }
</style>

<style>
  * {
    font-size: 15px;
    font-weight: 500;
  }

  .tile {
    border-radius: 5px;
  }
  .gray-tile {
    /* background: #111; */
    background: rgba(17, 17, 17, 0.5);
  }

  .inner-tile {
    background: rgba(0, 0, 0, 0.35) !important;
  }

  .inner-2-tile {
    background: rgba(100, 100, 100, 0.2) !important;
  }
  .tile-shadow {
    box-shadow: 0px 2px 2px #000;
  }

</style>
