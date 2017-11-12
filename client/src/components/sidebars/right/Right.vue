<template>
  <div class="players">
    <b-nav justified tabs>
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
    background: #222;
    min-height: 80vh;
    color: white;
  }

  a {
    color: white;
  }

  .nav-tabs, .nav-link {
    background: #111;
    border: none;
    border-radius: 0;
  }

  .nav-link.active {
    color: white;
    background:#555;
  }


</style>