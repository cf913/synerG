<template>
  <div class="players">
    <b-nav justified tabs class="tabs">
      <b-nav-item @click="tab = 'app-profile'" :active="tab === 'app-profile'"><i class="fa fa-user"></i></b-nav-item>
      <b-nav-item @click="tab = 'app-friends'" :active="tab === 'app-friends'"><i class="fa fa-users"></i></b-nav-item>
      <b-nav-item @click="tab = 'app-mail'" :active="tab === 'app-mail'"><i class="fa fa-envelope"></i></b-nav-item>
      <b-nav-item @click="tab = 'app-settings'" :active="tab === 'app-settings'"><i class="fa fa-gear"></i></b-nav-item>
      <b-nav-item @click="tab = 'app-newtab'" :active="tab === 'app-newtab'"><i class="fa fa-ellipsis-h"></i></b-nav-item>
    </b-nav>
    <keep-alive>
      <component :is="tab"></component>
    </keep-alive>
  </div>
</template>

<script>
import Profile from './Profile'
import Friends from './Friends'
import Mail from './Mail'
import Settings from './Settings'
import Newtab from './Newtab'

export default {
  data: () => {
    return {
      tab: 'app-profile'
    }
  },
  components: {
    appProfile: Profile,
    appFriends: Friends,
    appMail: Mail,
    appSettings: Settings,
    appNewtab: Newtab
  }

}
</script>

<style scoped>

  .players {
    border-radius: 5px;
    background: #222;
    min-height: 80vh;
    color: white;
  }

  ul.nav-tabs {
    border-radius: 5px 5px 0 0;
    margin-bottom: 15px;
    background: #111;
    border-color: #111;
  }

  li.nav-item {
    border:0;
  }

  li.nav-item a.nav-link{
    border-radius: 0;
    border:0;
        transition: 0.5s;
  }

  li.nav-item a.nav-link:hover,
  li.nav-item:first-child a.nav-link:hover,
  li.nav-item:last-child a.nav-link:hover {
    color: white;
    background-color: #1a1a1a; 
    transition: 0.1s;
  } 

  li.nav-item a.nav-link.active,
  li.nav-item:first-child a.nav-link.active,
  li.nav-item:last-child a.nav-link.active {
    background-color:#222;
    color: white;
  } 

  li.nav-item a.nav-link.active{
    border-radius: 0;
    border:0;
  }

  li.nav-item:first-child a.nav-link{
    border-radius: 5px 0 0 0;
    border:0;
  }

  li.nav-item:first-child a.nav-link.active{
    border-radius: 5px 0 0 0;
    border:0;
  } 
  li.nav-item:last-child a.nav-link{
    border-radius: 0 5px 0 0;    
    border:0;
  }

  li.nav-item:last-child a.nav-link.active{
    border-radius: 0 5px 0 0;    
    border:0;
  } 
  /* li.nav-item {
    border-radius: 5px;
    border: none;
  }

  a.nav-link {
    border-radius: 5px;
    color: white;
    border: none;
  }

  li:first-child a.nav-link {
    border-radius: 5px 0 0 0;
    background: #111;
        border:none;
  }
    li:last-child  a.nav-link {
    border-radius: 0 5px 0 0;
    background: #111;
        border:none;
  }
  li:first-child a.nav-link.active {
    border-radius: 5px 0 0 0;
    background:#555;
        border:none;
  }
  li:last-child  a.nav-link.active {
    border-radius: 0 5px 0 0;
        border:none;

  }

  .nav-link.active {
    color: white;
    background:#555;
    border:none;
  } */


</style>
