<template>
  <div class="friends-list tile gray-tile">
    <div class="container">
      <h5 class="title">Friends - {{friends.length}}</h5>
      <div id="friends-list">
        <ul class="list-group row">
          <li v-for="(friend, index) in friends" :key="index" class="list-group-item tile inner-tile col-lg-6">
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
</template>

<script>
export default {
  computed: {
    friends () {
      return this.$store.getters.user.friends.accepted
    }
  },
  methods: {
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
  .title {
    padding-top: 5px;
    padding-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: left;
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
  #friends-list {
    overflow-y: scroll;
    height: 82.5vh;
  }
</style>
