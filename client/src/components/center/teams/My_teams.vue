<template>
  <div class="my_teams text-left container tile gray-tile" style="position: relative" id="my-teams">
    <div class="container py-3 text-left">
      <div class="tiled inner-tile">
        <router-link :to="{ name: 'teamsNew'}">Create Team</router-link>
      </div>
      <div v-if="loading" class="text-center">
        <p class="lead">Loading your teams...</p>
        <img src="../../../assets/loading.svg" alt="">
      </div>
      <ul class="list-group clearfix">
        <li class="list-group-item inner-tile" v-for="(team, index) in myteams" :key="index">
          <app-team-item :team="team"></app-team-item>
        </li>
        <br>
      </ul>
      <div class="tiled inner-tile">
        <router-link :to="{ name: 'communityNew' }">Create New Community</router-link>
      </div>
      <ul class="list-group clearfix">
        <li class="list-group-item inner-tile" v-for="(community, index) in mycommunities" :key="index">
          <app-community-item :community="community"></app-community-item>
        </li>
        <br>
      </ul>
    </div>
  </div>
</template>

<script>
import TeamItem from './Team_item.vue'
import CommunityItem from '../communities/Community_item.vue'

export default {
  computed: {
    myteams () {
      return this.$store.getters.my_teams
    },
    mycommunities () {
      return this.$store.getters.my_communities
    },
    loading () {
      return this.$store.getters.my_team_list_loading
    }
  },
  methods: {
    getMyTeams () {
      return this.$store.dispatch('getMyTeams')
    },
    getMyCommunities () {
      return this.$store.dispatch('getMyCommunities')
    }
  },
  components: {
    appTeamItem: TeamItem,
    appCommunityItem: CommunityItem
  },
  activated () {
    this.getMyTeams()
    this.getMyCommunities()
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

  #my-teams {
    overflow-y: scroll;
    height: 92vh;
  }
</style>