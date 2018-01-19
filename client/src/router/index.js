import Vue from 'vue'
import Router from 'vue-router'

// COMPONENTS
import Main from '@/components/Main'
import Home from '@/components/center/Home'
import PlayerDetails from '@/components/center/players/Player_details'
import PlayerEdit from '@/components/center/players/Player_edit'
import Profile from '@/components/center/Profile'
import MyTeams from '@/components/center/teams/My_teams'
import TeamsNew from '@/components/center/teams/Team_new'
import TeamDetails from '@/components/center/teams/Team_details'

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
          path: 'players/:id/edit',
          component: PlayerEdit
        },
        {
          path: 'profile',
          component: Profile
        },
        {
          path: 'players/:id/myteams',
          component: MyTeams
        },
        {
          path: 'teams/new',
          component: TeamsNew
        },
        {
          path: 'teams/:id',
          component: TeamDetails
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
