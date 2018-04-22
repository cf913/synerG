<template>
  <div class="friends-requests tile gray-tile">
    <div class="container">
      <h5 class="title">Received - {{requests.length}}</h5>
      <ul v-if="requests.length > 0" class="list-group row">
        <li v-for="(friend, index) in requests" :key="index" class="list-group-item tile inner-tile col-lg-6">
          <div class="row">
            <div class="col-md-3 avatar">
              <img id="avatar" :src="friend.img" alt="Avatar">
            </div>
            <div class="col-md-9 summary">
              <a class="btn btn-success btn-sm float-right" @click="acceptRequest(friend._id)"><i class="fa fa-check fa-fw"></i></a>
              <a class="btn btn-danger btn-sm float-right" @click="declineRequest(friend._id)"><i class="fa fa-times fa-fw"></i></a>
              <router-link :to="{ name: 'playerDetails', params: { id: friend._id }}"><h5>{{ friend.steamName }}</h5></router-link>
            </div>
          </div>
        </li>
      </ul>
      <p v-else class="tile inner-tile title">You have not received any new friend requests</p>
      <h5 class="title">Sent - {{requests_sent.length}}</h5>
      <ul v-if="requests_sent.length > 0" class="list-group row">
        <li v-for="(friend, index) in requests_sent" :key="index" class="list-group-item tile inner-tile col-lg-6">
          <div class="row">
            <div class="col-md-3 avatar">
              <img id="avatar" :src="friend.img" alt="Avatar">
            </div>
            <div class="col-md-9 summary">
              <a class="btn btn-warning btn-sm float-right" @click="cancelRequest(friend._id)" title="Cancel request"><i class="fa fa-ban fa-fw"></i></a>
              <a class="btn btn-info btn-sm float-right" target="_blank" :href="`http://www.steamcommunity.com/profiles/${friend.steamId}`"><i class="fa fa-steam fa-fw"></i></a>
              <a v-if="inAccepted" class="btn btn-outline-secondary btn-sm float-right disabled"><i class="fa fa-check fa-fw"></i></a>
              <a v-else-if="friend.steamId !== user.steamId" :class="{disabled: !isLoggedIn}" class="btn btn-primary btn-sm float-right" @click="sendRequest(friend._id)"><i class="fa fa-user-plus fa-fw"></i></a>
              <router-link :to="{ name: 'playerDetails', params: { id: friend._id }}"><h5>{{ friend.steamName }}</h5></router-link>
            </div>
          </div>
        </li>
      </ul>
      <p v-else class="tile inner-tile title">You have not sent any new friend requests</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    requests_sent () {
      return this.$store.getters.user.friends.pending_sent
    },
    requests () {
      return this.$store.getters.user.friends.pending_received
    }
  },
  methods: {
    cancelRequest (id) {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('cancelRequest', id)
        this.$socket.emit('friends_cancel', { sender: this.$store.getters.user, receiverID: id, socketId: this.$socket.id })
      }
    },
    acceptRequest (id) {
      this.$store.dispatch('acceptRequest', id)
      this.$socket.emit('friends_accept', { sender: this.$store.getters.user, receiverID: id, socketId: this.$socket.id })
    },
    declineRequest (id) {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('declineRequest', id)
        this.$socket.emit('friends_decline', { sender: this.$store.getters.user, receiverID: id, socketId: this.$socket.id })
      }
    }
  },
  activated () {
    this.$store.dispatch('getFriends')
  }
}
</script>

<style scoped>
  .title {
    padding-top: 5px;
    padding-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: left;
    font-weight: 600;
    color: #DAA520;
  }

  #avatar {
    width: 100%;
    border: 3px solid #fff;
    border-radius: 5px;
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

  p.title {
    padding: 10px;
    margin-left: 5px;
  }
</style>
