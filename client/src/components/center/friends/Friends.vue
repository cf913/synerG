<template>
  <div class="friends tile gray-tile tiled">
    <div class="container-fluid">
      <b-nav justified tabs class="friends-nav">
        <b-nav-item @click="tab = 'app-friends-list'" :active="tab === 'app-friends-list'">Friends</b-nav-item>
        <b-nav-item @click="tab = 'app-friends-request'" :active="tab === 'app-friends-request'">Requests</b-nav-item>
      </b-nav>
      <keep-alive>
        <component :is="tab"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import FriendsList from './Friends_list'
import FriendsRequest from './Friends_requests'

export default {
  data () {
    return {
      tab: 'app-friends-list'
    }
  },
  components: {
    appFriendsList: FriendsList,
    appFriendsRequest: FriendsRequest
  }
}
</script>

<style scoped>
  div.container-fluid {
    padding: 0;
  }

  /*Styling for the nav bar tabs*/
  ul.friends-nav.nav-tabs {
    border-bottom: 3px solid #600;
  }
</style>
