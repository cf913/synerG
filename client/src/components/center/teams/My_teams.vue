<template>
  <div class="my_teams text-left container" style="position: relative">
    <div class="card inner-tile">
      <div class="container py-3 text-left">
        <div>
          <router-link to="/teams/new">Create Team</router-link>
        </div>
        <div v-if="loading" class="text-center">
          <p class="lead">Loading your teams...</p>
          <img src="../../../assets/loading.svg" alt="">
        </div>
        <!--<ul class="list-group clearfix" v-for="(player, index) in players" :key="index">-->
        <!--  <li class="list-group-item tile-shadow inner-tile">-->
        <!--  <app-player-item :player="player" @playerSelected="onPlayerSelected"></app-player-item>-->
        <!--  </li>-->
        <!--</ul>-->
      </div>
    </div>
  </div>
  <!--<div class="new-team">-->
  <!--  <h2 class="py-3">Teams</h2>-->
  <!--  <p>Team list works!</p>-->
  <!--</div> -->
</template>

<script>
export default {
  computed: {
    loading () {
      return this.$store.getters.player_list_loading
    }
  }
}
</script>

<style scoped>

</style>