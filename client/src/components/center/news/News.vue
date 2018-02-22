<template>
    <div class="news-feed container tile gray-tile tile-shadow">
      <h2 class="py-3">News</h2>
      <form>
        <div class="row container">
          <div class="left col-lg-2">
            <img class="avatar" :src="user.img" alt="Avatar">
          </div>
          <div class="right col-lg-10">
            <label class="col-form-label" for="post">Post:</label>
            <input type="text" class="form-control" id="post" name="post" v-model="post" placeholder="Write Post ...">
            <button @click.prevent="newPost" @keyup.enter.prevent="newPost">Submit</button>
          </div>
        </div>
      </form>
      <div class="tiled inner-tile">
        <ul class="list-group clearfix" v-for="(post, index) in posts" :key="index">
          <li class="list-group-item inner-tile">
            <div class="row">
              <div class="left col-lg-3">
                <img class="post-avatar" :src="post.author.img" alt="Avatar">
              </div>
              <div class="right col-lg-9">
                <p>{{post.author.steamName}}</p>
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
  data () {
    return {
      post: ''
    }
  },
  methods: {
    newPost () {
      const post = this.post
      this.$store.dispatch('newPost', post)
      this.post = ''
    },
    getPosts () {
      this.$store.dispatch('getPosts')
    }
  },
  computed: {
    user () {
      return !this.$store.getters.user ? 'No user logged in' : this.$store.getters.user
    },
    posts () {
      return this.$store.getters.posts
    }
  },
  activated () {
    console.log('fetching posts')
    this.getPosts()
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
