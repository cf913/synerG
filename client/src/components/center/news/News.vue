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
    }
  },
  computed: {
    user () {
      return !this.$store.getters.user ? 'No user logged in' : this.$store.getters.user
    }
  }
}
</script>

<style scoped>
  .avatar{
    max-height: 100%;
    max-width: 100%;
  }
</style>
