import Vue from 'vue'
import Router from 'vue-router'

// COMPONENTS
import Main from '@/components/Main'

import Welcome from '@/components/center/Welcome'
import Players from '@/components/center/Players'
import PlayerList from '@/components/players/Player_list'
import Teams from '@/components/center/Teams'
import News from '@/components/center/News'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import SteamLogin from '@/components/auth/SteamLogin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'Main',
      component: Main,
      // redirect: '/news',
      children: [
        {
          path: '',
          component: Welcome
        },
        {
          path: 'players',
          component: Players,
          children: [
            {
              path: '',
              component: PlayerList
            }
          ]
        },
        {
          path: 'teams',
          component: Teams
        },
        {
          path: 'news',
          component: News
        },
        {
          path: 'login',
          component: Login
        },
        {
          path: 'register',
          component: Register
        },
        {
          path: 'linksteam',
          component: SteamLogin
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
