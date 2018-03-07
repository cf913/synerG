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
    <ul class="list-group clearfix" v-for="(community, index) in communities" :key="index">
      <li class="list-group-item inner-tile">
        <app-community-item :community="community"></app-community-item>
      </li>
    </ul>
  </div>
</template>

<script>
import CommunityItem from './Community_item.vue'

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
    getCommunities () {
      return this.$store.dispatch('getCommunities')
    }
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
  components: {
    appCommunityItem: CommunityItem
  },
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
