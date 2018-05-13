<template>
  <div class="messages tile gray-tile mobile">
    <div class="container-fluid">
      <div class="row">
        <div class="left col-lg-4 sidebar">
          <app-message-list></app-message-list>
        </div>
        <div class="right col-lg-8">
          <keep-alive>
            <router-view></router-view>
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
.sidebar {
  padding: 0;
}

.right {
  position: relative;
}
</style>