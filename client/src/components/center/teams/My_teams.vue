<template>
  <div class="my_teams text-left container tile gray-tile" style="position: relative">
    <div class="container py-3 text-left">
      <div class="tiled inner-tile">
        <router-link to="/teams/new">Create Team</router-link>
      </div>
      <div v-if="loading" class="text-center">
        <p class="lead">Loading your teams...</p>
        <img src="../../../assets/loading.svg" alt="">
      </div>
      <ul class="list-group clearfix" v-for="(team, index) in myteams" :key="index">
        <li class="list-group-item tile-shadow inner-tile">
          <app-team-item :team="team"></app-team-item>
        </li>
        <br>
      </ul>
      <div class="tiled inner-tile">
        <router-link to="/communities/new">Create New Community</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TeamItem from './Team_item.vue'

export default {
  computed: {
    myteams () {
      return this.$store.getters.my_teams
    },
    loading () {
      return this.$store.getters.my_team_list_loading
    }
  },
  methods: {
    getMyTeams () {
      return this.$store.dispatch('getMyTeams')
    }
  },
  components: {
    appTeamItem: TeamItem
  },
  activated () {
    this.getMyTeams()
  }
}
</script>

<style scoped>
  .padding-0{
      padding-right:0;
      padding-left:0;
  }
  .maxwidth{
    width: 100%;
    margin: 0;
  }
  .tiled {
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
</style>