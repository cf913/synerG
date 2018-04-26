<template>
  <div class="community_members tile gray-tile">
    <div v-if="isCommunityAdmin" class="tiled other inner-tile">
      <p class="title">Pending Requests</p>
      <span v-if="community.pending.length !== 0">
        <ul class="list-group clearfix" v-for="(pending, index) in community.pending" :key="index">
          <li class="list-group-item inner-tile">
            <div class="row">
              <div class="col-sm-3">
                <img id="avatar" :src="pending.img" alt="Avatar">
              </div>
              <div class="col-sm-9">
                <router-link :to="{ name: 'playerDetails', params: { id: pending.steamId }}"><h5>{{ pending.steamName }}</h5></router-link>
                <a class="btn btn-danger btn-sm float-right" @click="declineCommunityRequest(pending)"><i class="fa fa-times fa-fw"></i></a>
                <a class="btn btn-success btn-sm float-right" @click="acceptCommunityRequest(pending)"><i class="fa fa-check fa-fw"></i></a>
              </div>
            </div>
          </li>
        </ul>
      </span>
      <p v-else class="title">You have no pending requests</p>
    </div>
    <div>
      <h6 class="title">Members - {{community.admins.length + community.members.length}}</h6>
      <ul class="list-group clearfix">
        <li class="list-group-item inner-tile" v-for="(admin, index) in community.admins" :key="index">
          <app-player-item :player="admin"></app-player-item>
        </li>
      </ul>
      <ul class="list-group clearfix">
        <li class="list-group-item inner-tile" v-for="(member, index) in community.members" :key="index">
          <app-player-item :player="member"></app-player-item>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PlayerItem from '../players/Player_item.vue'

export default {
  computed: {
    user () {
      if (!this.$store.getters.user) return false
      return this.$store.getters.user
    },
    community () {
      return this.$store.getters.community
    },
    isCommunityAdmin () {
      if (this.$store.getters.user) return this.$store.getters.community.admins.filter(admin => (admin.steamId === this.$store.getters.user.steamId)).length
      else return false
    }
  },
  methods: {
    declineCommunityRequest (player) {
      this.$store.dispatch('declineCommunityRequest', player)
    },
    acceptCommunityRequest (player) {
      this.$store.dispatch('acceptCommunityRequest', player)
    },
    onBack () {
      this.$router.go(-1)
    }
  },
  components: {
    appPlayerItem: PlayerItem
  }
}
</script>

<style scoped>
  .tiled {
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
  
  a {
    color: white;
    cursor: pointer;
  }
  
  a.btn.back {
    text-align: left;
    margin-bottom: 15px;
  }

  ul {
    padding-left: 0;
  }

  li {
    list-style-type: none;
    line-height: 1.6em;
    padding-left: 15px;
  }

  li.tiled {
    margin-bottom: 10px;
  }

  ul.links {
    margin-bottom: 5px;
  }
  ul.links li {
    display: inline-block;
  }
  
  #avatar {
    width: 40%;
    border: 3px solid #fff;
    border-radius: 5px;
  }

</style>