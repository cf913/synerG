<template>
	<div class="player_item">
    <div class="row">
      <div class="col-2 avatar">
        <img id="avatar" :src="player.img" alt="Avatar">
      </div>
      <div class="col-10 summary">
        <!-- <a class="btn btn-info btn-sm float-right" target="_blank" :href="`http://www.steamcommunity.com/profiles/${player.steamId}`"><i class="fa fa-steam fa-fw"></i></a> -->
        <!-- <a v-if="inReceived" class="btn btn-success btn-sm float-right" @click="acceptRequest(player._id)"><i class="fa fa-check fa-fw"></i></a>
        <a v-if="inReceived" class="btn btn-danger btn-sm float-right" @click="declineRequest(player._id)"><i class="fa fa-times fa-fw"></i></a>
        <a v-else-if="inSent" class="btn btn-warning btn-sm float-right" @click="cancelRequest(player._id)" title="Cancel request"><i class="fa fa-ban fa-fw"></i></a>
        <a v-else-if="inAccepted" class="btn btn-outline-secondary btn-sm float-right disabled"><i class="fa fa-check fa-fw"></i></a>
        <a v-else-if="player.steamId !== user.steamId" :class="{disabled: !isLoggedIn}" class="btn btn-primary btn-sm float-right" @click="sendRequest(player._id)"><i class="fa fa-user-plus fa-fw"></i></a> -->
        <!-- <router-link class="btn btn-warning btn-sm float-right" :to="{}"><i class="fa fa-comment fa-fw"></i></router-link> -->
        <!-- <router-link class="btn btn-secondary btn-sm float-right" :to="{ path: `/players/${player.steamId}`}"><i class="fa fa-user-circle-o fa-fw"></i></router-link> -->
        <!--<router-link :to="{ path: `/players/${player.steamId}`}"><h5>{{ player.steamName }}</h5></router-link>-->
        <router-link :to="{ name: 'playerDetails', params: { id: player._id }}"><h5>{{ player.steamName }}</h5></router-link>
        <ul class="d-flex details inner-2-tile">
          <!--<li v-if="player.mmr.mmr_estimate"><i class="fa fa-trophy fa-fw"></i>-->
          <!--  ~{{ player.mmr.mmr_estimate | toDecimal }}K-->
            <!--<div v-if="player.mmr.mmr_solo">-->
              <!--(s) {{ player.mmr.mmr_solo | toDecimal }}K-->
            <!--</div>-->
            <!--<div v-if="player.mmr.mmr_party">-->
              <!--(p) {{ player.mmr.mmr_party  | toDecimal }}K-->
            <!--</div>-->
          <!--</li>-->
          <li v-if="player.regions.length !== 0"><i class="fa fa-map-marker fa-fw"></i> {{ player.regions | displayListContent }}</li>
          <li v-if="player.languages.length !== 0"><i class="fa fa-globe fa-fw"></i> {{ player.languages | displayListContent }}</li>
          <li v-if="player.comms.length !== 0"><i class="fa fa-microphone fa-fw"></i> {{ player.comms | displayListContent }}</li>
          <li v-if="player.positions.length !== 0"><i class="fa fa-pie-chart fa-fw"></i> {{ player.positions | displayListContent }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['player'],
  computed: {
    user () {
      if (!this.$store.getters.user) return false
      return this.$store.getters.user
    },
    inSent () {
      if (this.$store.getters.user) return this.$store.getters.user.friends.pending_sent.filter(pendingSent => (pendingSent._id === this.player._id)).length
      else return false
    },
    inReceived () {
      if (this.$store.getters.user) return this.$store.getters.user.friends.pending_received.filter(pendingReceived => (pendingReceived._id === this.player._id)).length
      else return false
    },
    inAccepted () {
      if (this.$store.getters.user) return this.$store.getters.user.friends.accepted.filter(accepted => (accepted._id === this.player._id)).length
      else return false
    },
    inBlocked () {
      if (this.$store.getters.user) return this.$store.getters.user.friends.blocked.filter(blocked => (blocked._id === this.player._id)).length
      else return false
    },
    isLoggedIn () {
      return this.$store.getters.isAuthenticated
      // return true
    }
  },
  methods: {
    sendRequest (id) {
      this.$store.dispatch('sendRequest', id)
      this.$socket.emit('friends_request', { sender: this.$store.getters.user, receiverID: id, socketId: this.$socket.id })
    },
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
  }
}
</script>

<style scoped>

  a.btn {
    margin-left: 8px;
  }
  a.btn i {
    font-size: 1em;
  }
  #avatar {
    width: 100%;
    border: 3px solid #fff;
    border-radius: 5px;
  }

  a {
    cursor: pointer;
    color: white;
  }

  h5 {
    display: inline-block;
    margin-bottom: 15px;
  }

  a:hover h5{
    text-decoration: underline;
  }

  .details i {
    font-size: 1.2em;
    color: #ddd;
    margin-right: 4px;
  }

  ul.details {
    /* background: #222; */
    padding: 3px 5px;
    border-radius: 3px;
    flex-wrap: wrap;
  }
  .details li {
    padding: 2px 0;
    list-style-type: none;
    font-size: 0.9em;
    flex-basis: calc(48%);
  }

  .avatar {
    padding: 0;
  }

  .row {
    width: 100%;
    margin: 0;
  }

  .summary {
    padding-right: 0;
  }
</style>
