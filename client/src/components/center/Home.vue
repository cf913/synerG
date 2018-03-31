<template>
  <div class="home tile gray-tile tiled">
    <div class="container-fluid">
      <b-nav justified tabs class="home-nav">
        <b-nav-item @click="tab = 'app-news'" :active="tab === 'app-news'">News Feed</b-nav-item>
        <b-nav-item @click="tab = 'app-signals'" :active="tab === 'app-signals'">Signals</b-nav-item>
      </b-nav>
      <keep-alive>
        <component :is="tab"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import News from './news/News'
import Signals from './news/signals'

export default {
  name: 'Home',
  data () {
    return {
      tab: 'app-news'
    }
  },
  components: {
    appNews: News,
    appSignals: Signals
  }
}
</script>

<style scoped>
  div.container-fluid {
    padding: 0;
  }

  /*Styling for the nav bar tabs*/
  ul.home-nav.nav-tabs {
    border-bottom: 3px solid #600;
  }

/*  li.nav-item a.nav-link {
    color: #fff;
  }

  li.nav-item a.nav-link.active {
    background-color: #600;
    color: #fff;
    border: 1px solid #600;
  }*/
</style>