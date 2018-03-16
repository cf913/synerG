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
  </div>
</template>

<script>
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

  .img-thumbnails {
    border: 3px solid #fff;
    border-radius: 5px;
    margin-bottom: 30px;
    width: 100%;
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

  .title {
    font-weight: 600;
    /* color: #106CD6; */
    color: orange;
  }
  
  a.btn {
    margin-left: 8px;
  }
  
  a.btn i {
    font-size: 1em;
  }
  
  h5 {
    display: inline-block;
    margin-bottom: 15px;
  }
  
  a:hover h5{
    text-decoration: underline;
  }

  .avatar{
    max-height: 100%;
    max-width: 100%;
  }

</style>