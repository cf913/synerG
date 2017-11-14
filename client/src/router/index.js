import Vue from 'vue'
import Router from 'vue-router'

// COMPONENTS
import Main from '@/components/Main'
import Welcome from '@/components/Welcome'
import Players from '@/components/Players'
import PlayerList from '@/components/players/Player_list'
import Teams from '@/components/Teams'
import News from '@/components/News'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
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
        }
      ]
    }
  ]
})
