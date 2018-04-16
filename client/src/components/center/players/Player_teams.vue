<template>
  <div class="tiled player-teams inner-tile">
    <div class="tiled inner-tile">
      <h5 class="title">Teams</h5>
      <ul class="list-group clearfix" v-for="(team, index) in player.teams" :key="index">
        <li class="list-group-item inner-tile">
          <app-team-item :team="team"></app-team-item>
        </li>
      </ul>
    </div>
    <div class="tiled inner-tile">
      <h5 class="title">Communities</h5>
      <ul class="list-group row">
        <li class="list-group-item inner-tile col-lg-6" v-for="(community, index) in player.communities" :key="index">
          <app-community-item :community="community"></app-community-item>
        </li>
      </ul>
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
  ul li.list-group-item.col-lg-6 {
    margin: 5px 5px;
    max-width: 48.3%;
  }
</style>
