<template>
  <div class="community_posts tile gray-tile">
    <div class="tiled description inner-tile">
      <form v-if="isCommunityMember || isCommunityAdmin">
        <label class="col-form-label title" for="communityPost">Write a Post:</label>
        <input type="text" class="form-control" id="communityPost" name="communityPost" v-model="communityPost" placeholder="Write Post ...">
        <div class="d-flex justify-content-end align-items-center">
          <b-button type="submit" variant="warning" @click.prevent="newCommunityPost" @keyup.enter.prevent="newCommunityPost">Post</b-button>
        </div>
      </form>
    </div>
    <ul class="list-group clearfix">
      <li class="list-group-item inner-tile" v-for="(post, index) in communityPosts" :key="index">
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
  data () {
    return {
      communityPost: ''
    }
  },
  computed: {
    user () {
      if (!this.$store.getters.user) return false
      return this.$store.getters.user
    },
    communityPosts () {
      return this.$store.getters.community_posts
    },
    isCommunityAdmin () {
      if (this.$store.getters.user) return this.$store.getters.community.admins.filter(admin => (admin.steamId === this.$store.getters.user.steamId)).length
      else return false
    },
    isCommunityMember () {
      if (this.$store.getters.user) return this.$store.getters.community.members.filter(member => (member.steamId === this.$store.getters.user.steamId)).length
      else return false
    }
  },
  methods: {
    newCommunityPost () {
      const communityPost = this.communityPost
      this.$store.dispatch('newCommunityPost', communityPost)
      this.communityPost = ''
    },
    getCommunityPosts () {
      this.$store.dispatch('getCommunityPosts', this.$route.params.id)
    },
    onBack () {
      this.$router.go(-1)
    }
  },
  activated () {
    this.getCommunityPosts()
  }
}
</script>

<style scoped>
  .tiled {
    padding: 5px 10px;
    border-radius: 5px;
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

  .avatar{
    max-height: 100%;
    max-width: 100%;
  }

  .post-avatar {
    max-height: 90px;
    max-width: 90px;
  }
</style>