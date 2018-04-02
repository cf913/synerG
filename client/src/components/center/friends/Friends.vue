<template>
  <div class="friends tile gray-tile">
    <div class="container">
      <div class="row">
        <div class="col-md-6 tile">
          <h2>Requests:</h2>
          <ul class="list-group">
            <li v-for="(friend, index) in requests" :key="index" class="list-group-item tile inner-tile">
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
        </div>
        <div class="col-md-6 tile">
          <h2>Sent:</h2>
          <ul class="list-group">
            <li v-for="(friend, index) in requests_sent" :key="index" class="list-group-item tile inner-tile">
              <div class="row">
                <div class="col-md-3 avatar">
                  <img id="avatar" :src="friend.img" alt="Avatar">
                </div>
                <div class="col-md-9 summary">
                  <a class="btn btn-warning btn-sm float-right" @click="cancelRequest(friend._id)" title="Cancel request"><i class="fa fa-ban fa-fw"></i></a>
                  <!-- <a class="btn btn-info btn-sm float-right" target="_blank" :href="`http://www.steamcommunity.com/profiles/${friend.steamId}`"><i class="fa fa-steam fa-fw"></i></a> -->
               <!--  
                  <a v-else-if="inAccepted" class="btn btn-outline-secondary btn-sm float-right disabled"><i class="fa fa-check fa-fw"></i></a>
                  <a v-else-if="friend.steamId !== user.steamId" :class="{disabled: !isLoggedIn}" class="btn btn-primary btn-sm float-right" @click="sendRequest(friend._id)"><i class="fa fa-user-plus fa-fw"></i></a> -->
                  <router-link :to="{ name: 'playerDetails', params: { id: friend._id }}"><h5>{{ friend.steamName }}</h5></router-link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h2>Friends:</h2>
          {{friends}}
          <ul class="list-group">
            <li v-for="(friend, index) in friends" :key="index" class="lit-group-item tile inner-tile">
              <div class="row">
                <div class="col-md-3 avatar">
                  <img id="avatar" :src="friend.img" alt="Avatar">
                </div>
                <div class="col-md-9 summary">
                  <a class="btn btn-danger btn-sm float-right" @click="deleteFriend(friend._id)"><i class="fa fa-trash fa-fw"></i></a>
                  <router-link :to="{ name: 'playerDetails', params: { id: friend._id }}"><h5>{{ friend.steamName }}</h5></router-link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
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
    },
    friends () {
      return this.$store.getters.user.friends.accepted
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
    },
    deleteFriend (id) {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('deleteFriend', id)
        this.$socket.emit('friends_remove', { sender: this.$store.getters.user, receiverID: id, socketId: this.$socket.id })
      }
    }
  },
  activated () {
    this.$store.dispatch('getFriends')
  }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
  }

  li {
    padding: 15px;
    margin-bottom: 10px;
  }

  .container {
    padding: 15px;
  }

  #avatar {
    width: 100%;
    border: 3px solid #fff;
    border-radius: 5px;
  }
</style>
