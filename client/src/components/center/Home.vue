<template>
  <div class="players tile gray-tile tiled">
    <div class="container-fluid">
      <b-nav justified tabs class="tabs">
        <b-nav-item @click="tab = 'app-news'" :active="tab === 'app-news'">News Feed</b-nav-item>
        <b-nav-item @click="tab = 'app-my-posts'" :active="tab === 'app-my-posts'">My Posts</b-nav-item>
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
import MyPosts from './news/My_posts'
import Signals from './news/signals'

export default {
  name: 'Home',
  data: () => {
    return {
      tab: 'app-news'
    }
  },
  components: {
    appNews: News,
    appMyPosts: MyPosts,
    appSignals: Signals
  }
}
</script>

<style scoped>
  .tiled {
    padding: 10px;
    margin-bottom: 15px;
  }
</style>