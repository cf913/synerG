<template>
  <div class="my-posts container tile gray-tile tile-shadow">
    <h2 class="py-3">My Posts</h2>
    <div class="tiled inner-tile">
      <ul class="list-group clearfix" v-for="(post, index) in myposts" :key="index">
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
  </div>
</template>

<script>
export default {
  methods: {
    getMyPosts () {
      this.$store.dispatch('getMyPosts')
    }
  },
  computed: {
    user () {
      return !this.$store.getters.user ? 'No user logged in' : this.$store.getters.user
    },
    myposts () {
      return this.$store.getters.myposts
    }
  },
  activated () {
    console.log('fetching my posts')
    this.getMyPosts()
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
