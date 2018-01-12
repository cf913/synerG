<template>
  <div class="players tile gray-tile tile-shadow" v-if="isLoggedIn">
    <b-nav justified tabs class="tabs">
      <b-nav-item><router-link to="/"><i class="fa fa-newspaper-o"></i></router-link></b-nav-item>
      <b-nav-item><router-link to="/profile"><i class="fa fa-user"></i></router-link></b-nav-item>
      <b-nav-item><router-link to="/players/:id/myteams"><i class="fa fa-group"></i></router-link></b-nav-item>
      <b-nav-item><router-link to="/messages"><i class="fa fa-envelope"></i></router-link></b-nav-item>
      <b-nav-item><router-link to="/settings"><i class="fa fa-gear"></i></router-link></b-nav-item>
    </b-nav>
    <div class="card-header d-flex align-items-center" id="rightprofile">
      <img class="avatar" :src="user.img" alt="Avatar">
      <h4 class="profile-name">{{ user.steamName }}</h4>
    </div>
    <b-nav justified tabs class="tabs">
      <b-nav-item @click="tab = 'app-player-list'" :active="tab === 'app-player-list'">Players</b-nav-item>
      <b-nav-item @click="tab = 'app-team-list'" :active="tab === 'app-team-list'">Teams</b-nav-item>
    </b-nav>
    <keep-alive>
      <component :is="tab" id="search"></component>
    </keep-alive>

  </div>
  <div class="login" v-else>
    <a href="/auth/steam/steam" class="btn btn-primary btn-lg d-inline-flex align-items-center">
      <i class="fa fa-steam p-2"></i> 
      <span class="p-2">Sign in with Steam</span>
    </a>
    <router-link :to="{ path: `/players/${userId}/edit`}" class="btn btn-warning btn-lg my-2">Edit Profile</router-link>
  </div>
</template>

<script>
import Profile from '../../center/Profile'
import Friends from './Friends'
import Mail from './Mail'
import Settings from './Settings'
import PlayerList from '../../center/players/Player_list'
import TeamList from '../../center/teams/Team_list'

export default {
  data: () => {
    return {
      tab: 'app-player-list'
    }
  },
  computed: {
    user () {
      return !this.$store.getters.user ? 'No user logged in' : this.$store.getters.user
    },
    userId () {
      return this.$store.getters.userId
    },
    isLoggedIn () {
      return this.$store.getters.isAuthenticated
    }
  },
  components: {
    appProfile: Profile,
    appFriends: Friends,
    appMail: Mail,
    appSettings: Settings,
    appPlayerList: PlayerList,
    appTeamList: TeamList
  }
}
</script>

<style scoped>
  .login i {
    flex: 1;
    font-size: 2em;
  }
  .login span {
    flex: 2;
  }

  .players {
    min-height: 40vh;
    color: white;
  }
  
  #rightprofile{
    padding: 5px;
  }
  
  .avatar{
    margin-right: 10px;
    max-height: 100px;
    max-width: 100px;
  }
  
  ul.nav-tabs {
    border-radius: 5px 5px 0 0;
    background: #333;
    border-color: #333;
  }

  li.nav-item {
    border:0;
  }

  li.nav-item a.nav-link{
    border-radius: 0;
    border:0;
    transition: 0.5s;
  }

  li.nav-item a.nav-link:hover{
    color: white;
    background-color: #222; 
    transition: 0.1s;
  }

  li.nav-item a.nav-link.active{
    background-color:#111;
    color: white;
  }
  
  #search{
    padding: 0;
  }

</style>
