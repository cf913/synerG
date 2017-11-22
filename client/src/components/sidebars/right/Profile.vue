<template>
  <div class="profile">
    <div v-if="isLoggedIn" class="container">
      <div class="card">
        <div class="card-header">
          <h5 class="profile-name">{{ user.username }}</h5>
          <router-link to=""><i class="fa fa-edit"></i></router-link>
        </div> 
        <img class="card-img avatar" :src="user.img" alt="Avatar">
        <div class="card-body">
          <h4 class="card-title">Hard Carry</h4>
            <h6 class="card-subtitle mb-2 text-muted clearfix">Co-Founder</h6>
            <p class="card-text">
              <ul>
                <li>Online Store</li>
                <li>SEO</li>
                <li>Social Media Advertising</li>  
              </ul>
            </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Brisbane, Australia</small>
        </div>
      </div>
    </div>
    <div v-else>
      <router-link to="/login" class="btn btn-primary btn-lg">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return !this.$store.getters.user ? false : this.$store.getters.user
    },
    isLoggedIn () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>

<style scoped>
  .card {
    border-radius: 5px;
    background: #111;
    border: 0;
  }

  .profile-name {
    margin-top: 10px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
  }  

  .fa.fa-edit {
    margin-top: 15px;
    display: block;
    font-size: 1.2em;
  }

  .avatar {
    border-radius: 0;
    background: #444;
    min-height: 100px;
  }

</style>
