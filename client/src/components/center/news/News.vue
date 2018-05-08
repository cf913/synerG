<template>
  <div class="news-feed container gray-tile tiled">
    <div class="row container new-post">
      <div class="left col-2">
        <img class="avatar" :src="user.img" alt="Avatar">
      </div>
      <div class="right col-10">
        <b-form>
          <b-form-textarea type="text" v-model="post" :rows="2" :max-rows="6" placeholder="Write a new a post ..."></b-form-textarea>
          <div class="d-flex justify-content-start align-items-center buttons">
            <b-button-group>
              <b-button size="sm" variant="outline-secondary"><i class="fa fa-plus fa-fw"></i></b-button>
              <b-button size="sm" variant="outline-secondary"><i class="fa fa-photo fa-fw"></i></b-button>
            </b-button-group>
            <b-button size="sm" class="ml-auto" variant="warning" type="submit" @click.prevent="newPost" @keyup.enter.prevent="newPost">Submit</b-button>
          </div>
        </b-form>
      </div>
    </div>
    <div id="news-list">
      <ul class="list-group clearfix">
        <li class="list-group-item inner-tile"  v-for="(post, index) in posts" :key="index">
          <div class="row">
            <div class="left col-3">
              <img class="post-avatar" :src="post.author.img" alt="Avatar">
            </div>
            <div class="right col-9">
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
  .new-post {
    padding: 15px 0;
    margin: 0;
  }
  div.right {
    padding-right: 0;
  }
  div.left {
    padding-left: 0;
  }
  .avatar{
    width: 100%;
    border: 3px solid #fff;
    border-radius: 5px;
  }
  .tiled {
    padding: 15px 35px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
  .post-avatar {
    max-height: 90px;
    max-width: 90px;
  }

  ul li.list-group-item {
    margin: 3px 0;
  }

  li div.right {
    text-align: left;
  }

  li div.right p {
    padding-right: 5px;
  }

  .buttons {
    margin-top: 10px;
  }

  .buttons .btn {
    cursor: pointer;
  }

  #news-list {
    overflow-y: scroll;
    height: 75.5vh;
    margin: 0 30px;
  }

  @media (max-width: 500px) {
    #news-list {
      overflow-y: none;
      margin: 0;
    }

    .left {
      padding: 0;
    }

    .new-post {
      padding: 10px;
      margin-bottom: 15px;  
    }

    .tiled {
      padding: 0;
    }
  }
</style>
