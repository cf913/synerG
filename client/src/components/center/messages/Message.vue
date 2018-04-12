<template>
  <div class="messages tile gray-tile">
    <div class="row">
      <div class="left col-lg-4 sidebar">
        <div>
          <app-message-list></app-message-list> 
        </div>
      </div>
      <div class="right col-lg-8">
        <div class="fixed">
          <keep-alive>
            <router-view :key="$route.fullPath"></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Using player list for now but once friends is done should be friend list
import MessageList from './Message_list'

export default {
  name: 'Message',
  components: {
    appMessageList: MessageList
  }
}
</script>

<style scoped>
  .tiled {
    padding: 10px;
    margin-bottom: 15px;
  }
</style>