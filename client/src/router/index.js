import Vue from 'vue'
import Router from 'vue-router'

// COMPONENTS
import Main from '@/components/Main'
import Home from '@/components/center/Home'
import PlayerDetails from '@/components/center/players/Player_details'
import Profile from '@/components/center/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: Main,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'players/:id',
          component: PlayerDetails
        },
        {
          path: 'profile',
          component: Profile
        }
      ]
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
      // ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
