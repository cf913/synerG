<template>
  <div class="team_list text-left container" style="position: relative">
    <b-form>
      <b-form-input type="text" placeholder="Search for communities..." v-model="team_search"></b-form-input>
      <b-button @click.prevent="onSubmit()" variant="info"><i class="fa fa-search"></i> Search</b-button>
    </b-form>
    <div v-if="loading" class="text-center">
      <p class="lead">Searching for communities...</p>
      <img src="../../../assets/loading.svg" alt="">
    </div>
    <ul class="list-group clearfix" v-for="(team, index) in teams" :key="index">
      <li class="list-group-item inner-tile">
        <app-team-item :team="team"></app-team-item>
      </li>
    </ul>
  </div>
</template>

<script>
// import TeamItem from './Team_item.vue'

export default {
  data: () => {
    return {
      team_search: ''
    }
  },
  computed: {
    communities () {
      return this.$store.getters.communities
    },
    loading () {
      return this.$store.getters.community_list_loading
    }
  },
  methods: {
    // getTeams () {
    //   return this.$store.dispatch('getTeams')
    // },
    // refresh () {
    //   this.$store.commit('refreshTeamList', {
    //     loading: true,
    //     teams: []
    //   })
    //   this.getTeams()
    // },
    // onReset () {
    //   this.regions_selected = null
    //   this.languages_selected = null
    //   this.comms_selected = null
    //   this.recruiting_selected = null
    //   this.competitive_selected = null
    //   this.$store.dispatch('getTeams', {})
    // }
  },
  // components: {
  //   appCommunityItem: CommunityItem
  // },
  created () {
    this.getCommunities()
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
