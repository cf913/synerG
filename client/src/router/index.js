import Vue from 'vue'
import Router from 'vue-router'

// COMPONENTS
import Main from '@/components/Main'

import Welcome from '@/components/center/Welcome'
import Players from '@/components/center/Players'
import PlayerList from '@/components/center/players/Player_list'
import PlayerEdit from '@/components/center/players/Player_edit'
import PlayerDetails from '@/components/center/players/Player_details'
import Teams from '@/components/center/Teams'
import News from '@/components/center/News'

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
            },
            {
              path: ':id',
              component: PlayerDetails
            },
            {
              path: ':id/edit',
              component: PlayerEdit
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
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
