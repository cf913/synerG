<template>
  <div class="profile">
    <div v-if="isLoggedIn" class="container">
      <div class="card">
        <div class="card-header d-flex align-items-center">
              <img class="avatar" :src="user.img" alt="Avatar">
              <h4 class="profile-name">{{ user.steamName }}</h4>
              <router-link to="/players/edit" class="profile-edit"><i class="fa fa-edit"></i></router-link>

        
        </div> 
        <div class="card-body">
          {{user}}
        </div>
        <div class="card-footer">
          <small class="text-muted">This is a footer</small>
        </div>
      </div>
    </div>
    <div v-else>
      <a id="steamBtn" href="/auth/steam/steam" @click="getSteamInfo" class="btn btn-primary btn-lg">Login with Steam</a>
    </div>

  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return !this.$store.getters.user ? 'No user logged in' : this.$store.getters.user
    },
    isLoggedIn () {
      return true // this.$store.getters.isAuthenticated
    }
  },
  methods: {
    getSteamInfo () {
    }
  }
}
</script>

<style scoped>
  .card {
    border-radius: 5px;
    background: #000;
    border: 0;
    margin-bottom: 15px;
  }
  .card-header {
    border-bottom: 3px solid #666;
  }
  .profile-name {
    margin: 0;
    flex: 4;
  }

  .profile-edit {
    margin-top: 3px;
    flex: 1;
    text-align: right;
    font-size: 1.2em;
  }

  .avatar {
    flex: 2;
    border-radius: 3px;
    background: #444;
    max-width: 60px;
  }

  #steamBtn {
    margin: 10px auto;
  }
</style>
