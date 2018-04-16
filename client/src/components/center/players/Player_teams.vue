<template>
  <div class="tiled player-teams gray-tile">
    <div class="tiled">
      <h5 class="title">Teams</h5>
      <ul v-if="player.teams.length > 0" class="list-group clearfix teams">
        <li class="list-group-item inner-tile" v-for="(team, index) in player.teams" :key="index">
          <app-team-item :team="team"></app-team-item>
        </li>
      </ul>
      <p v-else class="tile inner-tile title">Currently not a part of any team</p>
    </div>
    <div class="tiled">
      <h5 class="title">Communities</h5>
      <ul v-if="player.communities.length > 0" class="list-group row">
        <li class="list-group-item inner-tile col-lg-6" v-for="(community, index) in player.communities" :key="index">
          <app-community-item :community="community"></app-community-item>
        </li>
      </ul>
      <p v-else class="tile inner-tile title">Currently not a part of any community</p>
    </div>
  </div>
</template>

<script>
import TeamItem from '../teams/Team_item.vue'
import CommunityItem from '../communities/Community_item.vue'

export default {
  computed: {
    player () {
      return this.$store.getters.player
    }
  },
  activated () {
    console.log('fetching player teams')
  },
  components: {
    appTeamItem: TeamItem,
    appCommunityItem: CommunityItem
  }
}
</script>

<style scoped>
  .avatar{
    max-height: 100%;
    max-width: 100%;
  }
  .tiled {
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
  .post-avatar {
    max-height: 90px;
    max-width: 90px;
  }
  .title {
    padding-top: 5px;
    padding-left: 5px;
    margin-bottom: 10px;
    text-align: left;
    font-weight: 600;
    color: #DAA520;
  }
  ul.list-group {
    max-width: 100%;
    margin: 0;
    text-align: left;
    flex-direction: row;
  }
  ul li.list-group-item {
    max-width: 100%;
  }
  ul li.list-group-item.col-lg-6 {
    margin: 5px 5px;
    max-width: 48.3%;
  }
  p.title {
    padding: 10px;
    margin-left: 5px;
  }
  ul.list-group.teams {
    display: block;
  }
  ul.list-group.teams li.list-group-item {
    margin: 5px 0;
  }
</style>
