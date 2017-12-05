<template>
  <div class="player_list text-left container" style="position: relative">
    <header class="text-center">
      <h2 class="py-3">Players</h2>
    </header>
    <!-- <button v-show="showRefresh" class="btn-primary btn-sm float-right" @click="refresh" style="position: absolute; top: -60px;"><i class="fa fa-refresh"></i></button> -->
    <div v-if="loading" class="text-center">
      <p class="lead">Searching for players...</p>
      <img src="../../../assets/loading.svg" alt="">
    </div>
      <ul class="list-group clearfix" v-for="(player, index) in players" :key="index">
        <li class="list-group-item tile-shadow">
          <app-player-item :player="player" @playerSelected="onPlayerSelected"></app-player-item>
        </li>
      </ul>
  </div>
</template>

<script>
import PlayerItem from './Player_item.vue'
import PlayerDetails from './Player_details.vue'

export default {
  data: () => {
    return {
      showDetails: false,
      showRefresh: true,
      selectedPlayer: {}
    }
  },
  computed: {
    players () {
      return this.$store.getters.players
    },
    loading () {
      return this.$store.getters.player_list_loading
    }
  },
  methods: {
    getPlayers () {
      return this.$store.dispatch('getPlayers')
    },
    onPlayerSelected (value) {
      this.showRefresh = false
      this.showDetails = true
      this.selectedPlayer = value
    },
    refresh () {
      this.$store.commit('refreshPlayerList', {
        loading: true,
        players: []
      })
      this.getPlayers()
    }
  },
  components: {
    appPlayerItem: PlayerItem,
    appPlayerDetails: PlayerDetails
  },
  created () {
    console.log('createing player list')
    this.getPlayers()
  }
}
</script>

<style scoped>
  li.list-group-item {
    list-style-type: none;
    background: #000;
    margin-bottom: 10px;
    /* color: #d4d4d4 */
    padding: 15px;
  }
</style>
