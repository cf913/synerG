<template>
  <div class="team_list text-left container" style="position: relative">
    <b-form>
      <b-form-input type="text" placeholder="Search for teams..." v-model="team_search">
      </b-form-input>
      <div class="row maxwidth">
        <div class="col-lg-4 padding-0">
          <b-form-select v-model="recruiting_selected" :options="recruiting_options">
          </b-form-select>
        </div>
        <div class="col-lg-4 padding-0">
          <b-form-select v-model="regions_selected" :options="regions_options">
          </b-form-select>
        </div>
        <div class="col-lg-4 padding-0">
          <b-form-select v-model="languages_selected" :options="languages_options">
          </b-form-select>
        </div>
      </div>
      <div class="row maxwidth">
        <div class="col-lg-4 padding-0">
          <b-form-select v-model="competitive_selected" :options="competitive_options">
          </b-form-select>
        </div>
        <div class="col-lg-4 padding-0">
          <b-form-select v-model="comms_selected" :options="comms_options">
          </b-form-select>
        </div>
        <div class="col-lg-4 padding-0">
          <!--Need to add functionality here to actually submit-->
          <b-button @click.prevent="onSubmit()" variant="info"><i class="fa fa-search"></i> Search</b-button>
          <b-button @click.prevent="onReset()" variant="warning">Reset</b-button>
        </div>
      </div>

    </b-form>
    <div v-if="loading" class="text-center">
      <p class="lead">Searching for teams...</p>
      <img src="../../../assets/loading.svg" alt="">
    </div>
    <ul class="list-group clearfix" v-for="(team, index) in teams" :key="index">
      <li class="list-group-item inner-tile">
        <!--<app-team-item :team="team" @teamSelected="onTeamSelected"></app-team-item>-->
        <app-team-item :team="team"></app-team-item>
      </li>
    </ul>
  </div>
</template>

<script>
import TeamItem from './Team_item.vue'

export default {
  data: () => {
    return {
      // showDetails: false,
      // showRefresh: true,
      // selectedTeam: {},
      recruiting_selected: null, // Must be an array reference!
      regions_selected: null,
      languages_selected: null,
      comms_selected: null,
      competitive_selected: null,
      recruiting_options: [
        { text: 'Recruiting:', value: null },
        { text: 'Carry', value: 'Carry' },
        { text: 'Midlaner', value: 'Midlaner' },
        { text: 'Offlaner', value: 'Offlaner' },
        { text: 'Farming Support', value: 'Farming Support' },
        { text: 'Hard Support', value: 'Hard Support' }
      ],
      regions_options: [
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
      languages_options: [
        { text: 'Language:', value: null },
        { text: 'English', value: 'English' },
        { text: 'Chinese', value: 'Chinese' },
        { text: 'French', value: 'French' },
        { text: 'Korean', value: 'Korean' },
        { text: 'Portuguese', value: 'Portuguese' },
        { text: 'Russian', value: 'Russian' },
        { text: 'Spanish', value: 'Spanish' }
      ],
      comms_options: [
        { text: 'Communication', value: null },
        { text: 'In-Game Chat/Mic', value: 'In-Game Chat/Mic' },
        { text: 'Discord', value: 'Discord' },
        { text: 'TeamSpeak', value: 'TeamSpeak' },
        { text: 'Skype', value: 'Skype' }
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
    teams () {
      return this.$store.getters.teams
    },
    loading () {
      return this.$store.getters.team_list_loading
    }
  },
  methods: {
    getTeams () {
      return this.$store.dispatch('getTeams')
    },
    // onTeamSelected (value) {
    //   this.showRefresh = false
    //   this.showDetails = true
    //   this.selectedTeam = value
    // },
    refresh () {
      this.$store.commit('refreshTeamList', {
        loading: true,
        teams: []
      })
      this.getTeams()
    },
    onSubmit () {
      const data = {
        regions: this.regions_selected,
        languages: this.languages_selected,
        comms: this.comms_selected,
        recruiting: this.recruiting_selected,
        competitiveness: this.competitive_selected
      }
      this.$store.dispatch('getTeams', data)
    },
    onReset () {
      this.regions_selected = null
      this.languages_selected = null
      this.comms_selected = null
      this.recruiting_selected = null
      this.competitive_selected = null
      this.$store.dispatch('getTeams', {})
    }
  },
  components: {
    appTeamItem: TeamItem
  },
  created () {
    this.getTeams()
  }
}
</script>

<style scoped>
  .inner-tile {
    margin-bottom: 5px;
  }
  .padding-0{
      padding-right:0;
      padding-left:0;
  }
  .maxwidth{
    width: 100%;
    margin: 0;
  }
</style>
