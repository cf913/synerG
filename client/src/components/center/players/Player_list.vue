<template>
  <div class="player_list text-left container" style="position: relative">
    <b-form>
      <div class="row">
        <div class="col-sm-9">
          <b-form-input type="text" placeholder="Search for players..." v-model="player_search">
          </b-form-input>
        </div>
        <div class="col-sm-3">
          <!--Need to add functionality here to actually submit-->
          <b-button>Submit</b-button>
        </div>        
        <div class="col-sm-4">
          <b-form-select v-model="position_selected" :options="position_options">
          </b-form-select>
        </div>
        <div class="col-sm-4">
          <b-form-select v-model="mmr_selected" :options="mmr_options">
          </b-form-select>
        </div>
        <div class="col-sm-4">
          <b-form-select v-model="region_selected" :options="region_options">
          </b-form-select>
        </div>
        <div class="col-sm-4">
          <b-form-select v-model="language_selected" :options="language_options">
          </b-form-select>
        </div>
        <div class="col-sm-4">
          <b-form-select v-model="competitive_selected" :options="competitive_options">
          </b-form-select>
        </div>
      </div>
    </b-form>    
    <!-- <button v-show="showRefresh" class="btn-primary btn-sm float-right" @click="refresh" style="position: absolute; top: -60px;"><i class="fa fa-refresh"></i></button> -->
    <div v-if="loading" class="text-center">
      <p class="lead">Searching for players...</p>
      <img src="../../../assets/loading.svg" alt="">
    </div>
      <ul class="list-group clearfix" v-for="(player, index) in players" :key="index">
        <li class="list-group-item tile-shadow inner-tile">
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
      selectedPlayer: {},
      position_selected: null, // Must be an array reference!
      mmr_selected: null,
      region_selected: null,
      language_selected: null,
      competitive_selected: null,
      position_options: [
        { text: 'Position:', value: null },
        { text: 'Carry', value: 'Carry' },
        { text: 'Midlaner', value: 'Midlaner' },
        { text: 'Offlaner', value: 'Offlaner' },
        { text: 'Farming Support', value: 'Farming Support' },
        { text: 'Hard Support', value: 'Hard Support' }
      ],
      mmr_options: [
        { text: 'Ranking:', value: null },
        { text: 'Herald (0)', value: 'Herald(0)' },
        { text: 'Herald (1)', value: 'Herald(1)' },
        { text: 'Herald (2)', value: 'Herald(2)' },
        { text: 'Herald (3)', value: 'Herald(3)' },
        { text: 'Herald (4)', value: 'Herald(4)' },
        { text: 'Herald (5)', value: 'Herald(5)' },
        { text: 'Guardian (0)', value: 'Guardian(0)' },
        { text: 'Guardian (1)', value: 'Guardian(1)' },
        { text: 'Guardian (2)', value: 'Guardian(2)' },
        { text: 'Guardian (3)', value: 'Guardian(3)' },
        { text: 'Guardian (4)', value: 'Guardian(4)' },
        { text: 'Guardian (5)', value: 'Guardian(5)' },
        { text: 'Crusader (0)', value: 'Crusader(0)' },
        { text: 'Crusader (1)', value: 'Crusader(1)' },
        { text: 'Crusader (2)', value: 'Crusader(2)' },
        { text: 'Crusader (3)', value: 'Crusader(3)' },
        { text: 'Crusader (4)', value: 'Crusader(4)' },
        { text: 'Crusader (5)', value: 'Crusader(5)' },
        { text: 'Archon (0)', value: 'Archon(0)' },
        { text: 'Archon (1)', value: 'Archon(1)' },
        { text: 'Archon (2)', value: 'Archon(2)' },
        { text: 'Archon (3)', value: 'Archon(3)' },
        { text: 'Archon (4)', value: 'Archon(4)' },
        { text: 'Archon (5)', value: 'Archon(5)' },
        { text: 'Legend (0)', value: 'Legend(0)' },
        { text: 'Legend (1)', value: 'Legend(1)' },
        { text: 'Legend (2)', value: 'Legend(2)' },
        { text: 'Legend (3)', value: 'Legend(3)' },
        { text: 'Legend (4)', value: 'Legend(4)' },
        { text: 'Legend (5)', value: 'Legend(5)' },
        { text: 'Ancient (0)', value: 'Ancient(0)' },
        { text: 'Ancient (1)', value: 'Ancient(1)' },
        { text: 'Ancient (2)', value: 'Ancient(2)' },
        { text: 'Ancient (3)', value: 'Ancient(3)' },
        { text: 'Ancient (4)', value: 'Ancient(4)' },
        { text: 'Ancient (5)', value: 'Ancient(5)' },
        { text: 'Divine (0)', value: 'Divine(0)' },
        { text: 'Divine (1)', value: 'Divine(1)' },
        { text: 'Divine (2)', value: 'Divine(2)' },
        { text: 'Divine (3)', value: 'Divine(3)' },
        { text: 'Divine (4)', value: 'Divine(4)' },
        { text: 'Divine (5)', value: 'Divine(5)' },
        { text: 'Leaderboards', value: 'Leaderboards' }
      ],
      region_options: [
        { text: 'Region:', value: null },
        { text: 'Chile', value: 'Chile' },
        { text: 'China', value: 'China' },
        { text: 'Dubai', value: 'Dubai' },
        { text: 'EU West', value: 'EU West' },
        { text: 'EU East', value: 'EU East' },
        { text: 'Japan', value: 'Japan' },
        { text: 'Australia', value: 'Australia' },
        { text: 'Russia', value: 'Russia' },
        { text: 'SEA', value: 'SEA' },
        { text: 'South Africa', value: 'South Africa' },
        { text: 'US West', value: 'US West' },
        { text: 'US East', value: 'US East' }
      ],
      language_options: [
        { text: 'Language:', value: null },
        { text: 'English', value: 'English' },
        { text: 'Chinese', value: 'Chinese' },
        { text: 'French', value: 'French' },
        { text: 'Korean', value: 'Korean' },
        { text: 'Portuguese', value: 'Portuguese' },
        { text: 'Russian', value: 'Russian' },
        { text: 'Spanish', value: 'Spanish' }
      ],
      competitive_options: [
        { text: 'Competitiveness:', value: null },
        { text: 'Casual Unranked', value: 'Casual Unranked' },
        { text: 'Casual Ranked', value: 'Casual Ranked' },
        { text: 'Semi-Competitive Ranked', value: 'Semi-Competitive Ranked' },
        { text: 'Competitive Ranked', value: 'Competitive Ranked' },
        { text: 'Tournaments', value: 'Tournaments' }
      ]
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
    this.getPlayers()
  }
}
</script>

<style scoped>
  li.list-group-item {
    list-style-type: none;
    /* background: #000; */
    margin-bottom: 10px;
    /* color: #d4d4d4 */
    padding: 15px;
  }
</style>
