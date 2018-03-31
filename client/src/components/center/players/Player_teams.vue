<template>
  <div class="tiled teams inner-tile">
    <p class="title">Teams</p>
    <ul class="list-group clearfix" v-for="(team, index) in player.teams" :key="index">
      <li class="list-group-item inner-tile">
        <app-team-item :team="team"></app-team-item>
      </li>
    </ul>
    <p class="title">Communities</p>
    <ul class="list-group clearfix" v-for="(community, index) in player.communities" :key="index">
      <li class="list-group-item inner-tile">
        <app-community-item :community="community"></app-community-item>
      </li>
    </ul>
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
</style>
