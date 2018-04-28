<template>
  <div class="player_details tile gray-tile tiled">
    <div class="container-fluid">
      <b-nav justified tabs class="player-nav">
        <b-nav-item @click="tab = 'app-player-summary'" :active="tab === 'app-player-summary'">Summary</b-nav-item>
        <b-nav-item v-if="isFriend || this.$route.params.id === user._id" @click="tab = 'app-player-posts'" :active="tab === 'app-player-posts'">Posts</b-nav-item>
        <b-nav-item @click="tab = 'app-player-teams'" :active="tab === 'app-player-teams'">Teams/Communities</b-nav-item>
      </b-nav>
      <keep-alive>
        <component :is="tab"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import PlayerSummary from './Player_summary'
import PlayerPosts from './Player_posts'
import PlayerTeams from './Player_teams'

export default {
  data () {
    return {
      tab: 'app-player-summary'
    }
  },
  methods: {
    resetPage () {
      this.tab = 'app-player-summary'
    }
  },
  computed: {
    user () {
      if (!this.$store.getters.user) return false
      return this.$store.getters.user
    },
    // friends () {
    //   return this.$store.getters.user.friends.accepted
    // },
    isFriend () {
      if (this.$store.getters.user) return this.$store.getters.user.friends.accepted.filter(friend => (friend._id === this.$route.params.id)).length
      else return false
    }
  },
  components: {
    appPlayerSummary: PlayerSummary,
    appPlayerPosts: PlayerPosts,
    appPlayerTeams: PlayerTeams
  },
  activated () {
    this.resetPage()
    this.$store.dispatch('getFriends')
  }
}
</script>

<style scoped>
  div.container-fluid {
    padding: 0;
  }

  /*Styling for the nav bar tabs*/
  ul.player-nav.nav-tabs {
    border-bottom: 3px solid #600;
  }
</style>