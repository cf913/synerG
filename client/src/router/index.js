import Vue from 'vue'
import Router from 'vue-router'

// COMPONENTS
import Main from '@/components/Main'

import Welcome from '@/components/center/Welcome'
import Players from '@/components/center/Players'
import PlayerList from '@/components/center/players/Player_list'
import PlayerEdit from '@/components/center/players/Player_edit'
import PlayerDetails from '@/components/center/players/Player_details'

import Left from '@/components/sidebars/left/Left'
import FilterPlayers from '@/components/sidebars/left/filters/Filter_players'
import FilterTeams from '@/components/sidebars/left/filters/Filter_teams'

import Right from '@/components/sidebars/right/Right'

import Teams from '@/components/center/Teams'
import TeamNew from '@/components/center/teams/Team_new'
import TeamList from '@/components/center/teams/Team_list'

import News from '@/components/center/News'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: {
        default: Main,
        right: Right
      },
      // redirect: '/news',
      children: [
        {
          path: '',
          components: {
            default: Welcome,
            left: Left
          }
        },
        {
          path: 'players',
          components: {
            default: Players,
            left: FilterPlayers
          },
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
          components: {
            default: Teams,
            left: FilterTeams
          },
          children: [
            {
              path: '', // change to new
              component: TeamList
            },
            {
              path: 'new', // change to new
              component: TeamNew
            }
          ]
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
