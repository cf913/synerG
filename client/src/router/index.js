import Vue from 'vue'
import Router from 'vue-router'

// COMPONENTS
import Landing from '@/components/Landing'
import Main from '@/components/Main'
import Home from '@/components/center/Home'
import PlayerDetails from '@/components/center/players/Player_details'
import PlayerEdit from '@/components/center/players/Player_edit'
import MyTeams from '@/components/center/teams/My_teams'
import TeamsNew from '@/components/center/teams/Team_new'
import TeamDetails from '@/components/center/teams/Team_details'
import TeamEdit from '@/components/center/teams/Team_edit'
import CommunityNew from '@/components/center/communities/Community_new'
import CommunityDetails from '@/components/center/communities/Community_details'
import CommunityEdit from '@/components/center/communities/Community_edit'
import Friends from '@/components/center/friends/Friends'
import Message from '@/components/center/messages/Message'
import MessageDetails from '@/components/center/messages/Message_details'
import MessageNew from '@/components/center/messages/Message_new'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Landing,
      name: 'home'
    },
    {
      path: '/app',
      component: Main,
      children: [
        {
          path: '',
          component: Home,
          name: 'main'
        },
        {
          path: 'players/:id',
          component: PlayerDetails,
          name: 'playerDetails'
        },
        {
          path: 'players/:id/edit',
          component: PlayerEdit
        },
        {
          path: 'myteams',
          component: MyTeams,
          name: 'myTeams'
        },
        {
          path: 'teams/new',
          component: TeamsNew
        },
        {
          path: 'teams/:id',
          component: TeamDetails,
          name: 'teamDetails'
        },
        {
          path: 'teams/:id/edit',
          component: TeamEdit,
          name: 'teamEdit'
        },
        {
          path: 'communities/new',
          component: CommunityNew
        },
        {
          path: 'communities/:id',
          component: CommunityDetails,
          name: 'communityDetails'
        },
        {
          path: 'communities/:id/edit',
          component: CommunityEdit,
          name: 'communityEdit'
        },
        {
          path: 'friends',
          component: Friends,
          name: 'myFriends'
        },
        {
          path: 'messages',
          component: Message,
          name: 'myMessages',
          children: [
            {
              path: ':id',
              component: MessageDetails,
              name: 'messageDetails'
            },
            {
              path: 'new/:recipient',
              component: MessageNew
            }
          ]
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
