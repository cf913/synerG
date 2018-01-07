<template>
  <div class="players tile gray-tile">
    <div class="container-fluid">
      <div class="row">
        <div class="left col-lg-4 sidebar">
          <div>
            <app-filter></app-filter> 
          </div>
        </div>
        <div class="right col-lg-8">
          <div class="fixed">
            <app-news></app-news>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Filter from '../sidebars/left/Filter_players'
import News from './News'

export default {
  name: 'Home',
  components: {
    appFilter: Filter,
    appNews: News
  }
}
</script>

<style scoped>
  .players {
    display: flex;
    justify-content: center;
    align-self: center;
    min-height: 80vh;
    color: white;
  }
</style>