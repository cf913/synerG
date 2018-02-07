<template>
  <div class="players tile gray-tile tiled">
    <div class="container-fluid">
      <div class="row">
        <div class="left col-lg-4 sidebar">
          <div>
            <app-message-list></app-message-list> 
          </div>
        </div>
        <div class="right col-lg-8">
          <div class="fixed">
            <keep-alive>
              <app-message-details></app-message-details>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Using player list for now but once friends is done should be friend list
import MessageList from './Message_list'
import MessageDetails from './Message_details'

export default {
  name: 'Home',
  components: {
    appMessageList: MessageList,
    appMessageDetails: MessageDetails
  }
}
</script>

<style scoped>
  .tiled {
    padding: 10px;
    margin-bottom: 15px;
  }

  .players {
    display: flex;
    justify-content: center;
    align-self: center;
    min-height: 80vh;
    color: white;
  }
</style>