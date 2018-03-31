<template>
  <div class="player-posts container">
    <ul class="list-group clearfix" v-for="(post, index) in playerposts" :key="index">
      <li class="list-group-item inner-tile">
        <div class="row">
          <div class="left col-lg-3">
            <img class="post-avatar" :src="post.author.img" alt="Avatar">
          </div>
          <div class="right col-lg-9">
            <router-link :to="{ name: 'playerDetails', params: {id: post.author._id}}"><h5>{{post.author.steamName}}</h5></router-link>
            <p>{{post.body}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    getPlayerPosts () {
      this.$store.dispatch('getPlayerPosts', this.$route.params.id)
    }
  },
  computed: {
    playerposts () {
      return this.$store.getters.playerposts
    }
  },
  activated () {
    console.log('fetching player posts')
    this.getPlayerPosts()
  }
}
</script>

<style scoped>
  .avatar{
    max-height: 100%;
    max-width: 100%;
  }
  .tiled {
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
  .post-avatar {
    max-height: 90px;
    max-width: 90px;
  }
</style>
