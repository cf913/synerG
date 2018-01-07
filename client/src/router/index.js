import Vue from 'vue'
import Router from 'vue-router'

// COMPONENTS
import Main from '@/components/Main'

import Center from '@/components/center/Center'

import Right from '@/components/sidebars/right/Right'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: Main,
      // redirect: '/news',
      children: [
        {
          path: '',
          components: {
            main: Center,
            right: Right
          }
        }
    //     {
    //       path: 'players',
    //       components: {
    //         default: Players,
    //         left: FilterPlayers
    //       },
    //       children: [
    //         {
    //           path: '',
    //           component: PlayerList
    //         },
    //         {
    //           path: ':id',
    //           component: PlayerDetails
    //         },
    //         {
    //           path: ':id/edit',
    //           component: PlayerEdit
    //         }
    //       ]
    //     },
    //     {
    //       path: 'teams',
    //       components: {
    //         default: Teams,
    //         left: FilterTeams
    //       },
    //       children: [
    //         {
    //           path: '', // change to new
    //           component: TeamList
    //         },
    //         {
    //           path: 'new', // change to new
    //           component: TeamNew
    //         }
    //       ]
    //     },
    //     {
    //       path: 'news',
    //       component: News
    //     }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
