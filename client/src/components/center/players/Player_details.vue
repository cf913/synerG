<template>
  <div class="player_details tile gray-tile">
    <!-- WHILE LOADING -->
    <div v-if="loading" class="text-center">
      <div class="container py-3 text-left">
        <a class="btn btn-primary btn-sm back" @click="onBack"><i class="fa fa-arrow-left fa-fw"></i> Back</a>
      </div>
      <div class="text-center">
        <h2 class="py-3">...</h2>
      </div>
      <p class="lead">Baking bread...</p>
      <img src="../../../assets/loading.svg" alt="">
    </div>
    <!-- CONTENT -->
    <div v-else>
      <div class="container py-3 text-left">
        <div class="row">
          <div class="col-4 text-left">
            <img class="img-thumbnails" :src="player.img" alt="Avatar">
            <ul>
              <li class="tiled inner-tile">
                <span class="title"><i class="fa fa-trophy fa-fw"></i> MMR:</span>
                <ul>
                  <!--<li>Estimate: ~{{player.mmr.mmr_estimate}}</li>-->
                  <li>Solo: ----</li>
                  <li>Party: ----</li>
                </ul>
              </li>
              <li class="tiled inner-tile">
                <span class="title"><i class="fa fa-map-marker fa-fw"></i> Regions:</span>
                <ul v-for="(region, index) in player.regions" :key="index">
                  <li>{{region}}</li>
                </ul>
              </li>
              <li class="tiled inner-tile">
                <span class="title"><i class="fa fa-globe fa-fw"></i> Languages:</span>
                <ul v-for="(language, index) in player.languages" :key="index">
                  <li>{{language}}</li>
                </ul>
              </li>
              <li class="tiled inner-tile">
                <span class="title"><i class="fa fa-headphones fa-fw"></i> Comms:</span>
                <ul v-for="(comm, index) in player.comms" :key="index">
                  <li>{{comm}}</li>
                </ul>
              </li>
              <li class="tiled inner-tile">
                <span class="title"><i class="fa fa-pie-chart fa-fw"></i> Positions:</span>
                <ul v-for="(position, index) in player.positions" :key="index">
                  <li>{{position}}</li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="col-8 text-left">
            <header class="d-flex justify-content-between align-items-center">
              <h2>{{player.steamName}}</h2>
              <ul class="links">
                <span v-if="userId === player.steamId">
                  <li><router-link :to="{ path: `/players/${userId}/edit`}" class="scale-up"><i class="fa fa-edit"></i></router-link></li>
                </span>
                <span v-else>
                  <li v-if="inReceived"><a class="scale-up" @click="acceptRequest(player.steamId)"><i class="fa fa-check fa-fw"></i></a></li>
                  <li v-if="inReceived"><a class="scale-up" @click="declineRequest(player.steamId)"><i class="fa fa-times fa-fw"></i></a></li>
                  <li v-else-if="inSent"><a class="scale-up" @click="cancelRequest(player.steamId)"><i class="fa fa-ban fa-fw"></i></a></li>
                  <li v-else-if="inAccepted"><a class="scale-up" @click="deleteFriend(player.steamId)"><i class="fa fa-trash fa-fw"></i></a></li>
                  <li v-else><a class="scale-up" @click="sendRequest(player.steamId)"><i class="fa fa-user-plus fa-fw"></i></a></li>
                </span>
                <li><a :href="`http://www.steamcommunity.com/profiles/${player.steamId}`" class="scale-up" target="_blank"><i class="fa fa-steam-square fa-fw"></i></a></li>
                <li><a class="scale-up" @click="updatePlayer"><i class="fa fa-refresh fa-fw"></i></a></li>
              </ul>
            </header>
            <div class="tiled description inner-tile">
              <p>
                <span class="title">Description:</span><br>
                {{player.description}}
              </p>
            </div>
            <div class="tiled heroes inner-tile">
              <p> 
                <span class="title">Most Played Heroes</span>
                <table>
                    <thead>
                      <tr>
                        <th class="text-center table-header">Hero ID</th>
                        <th class="text-center table-header">Games Played</th>
                        <th class="text-center table-header">Games Won</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(hero, index) in player.heroes.slice(0, 5)" :key="index">
                        <!--<img class="img-thumbnails" :src="'https://api.opendota.com' + heroStats.heroStats[hero.hero_id - 2].img" alt="Avatar">-->
                        <img class="img-thumbnails" :src="heroes[hero.hero_id - 1].img" alt="Avatar">
                        <!--<td class="text-center">{{ heroStats.heroStats[hero.hero_id].id }}</td>-->
                        <td class="text-center table-content">{{ hero.games }}</td>
                        <td class="text-center table-content">{{ hero.win }}</td>
                      </tr>
                    </tbody>
                  </table>
              </p>
            </div>
            <div class="tiled teams inner-tile">
              <p class="title">Teams</p>
              <ul class="list-group clearfix" v-for="(team, index) in player.teams" :key="index">
                <li class="list-group-item tile-shadow inner-tile">
                  <app-team-item :team="team"></app-team-item>
                </li>
              </ul>
            </div>
            <div class="tiled playstyle inner-tile">
              <p class="title">Playstyle</p>
            </div>
            <div class="tiled other inner-tile">
              <p class="title">Other</p>
            </div>
          </div>
        </div>
      </div>

    </div>
    <br><br>
  </div>
</template>

<script>
import TeamItem from '../teams/Team_item.vue'
import TeamDetails from '../teams/Team_details.vue'

export default {
  computed: {
    userId () {
      return this.$store.getters.userId
    },
    heroes () {
      return this.$store.getters.heroes
    },
    player () {
      return this.$store.getters.player
    },
    loading () {
      return this.$store.getters.player_loading
    },
    inSent () {
      if (this.$store.getters.user) return this.$store.getters.user.friends.pending_sent.includes(this.player.steamId)
      else return false
    },
    inReceived () {
      if (this.$store.getters.user) return this.$store.getters.user.friends.pending_received.includes(this.player.steamId)
      else return false
    },
    inAccepted () {
      if (this.$store.getters.user) return this.$store.getters.user.friends.accepted.includes(this.player.steamId)
      else return false
    },
    inBlocked () {
      if (this.$store.getters.user) return this.$store.getters.user.friends.blocked.includes(this.player.steamId)
      else return false
    }
  },
  methods: {
    sendRequest (id) {
      this.$store.dispatch('sendRequest', id)
    },
    cancelRequest (id) {
      confirm('Are you sure?')
      this.$store.dispatch('cancelRequest', id)
    },
    acceptRequest (id) {
      this.$store.dispatch('acceptRequest', id)
    },
    declineRequest (id) {
      confirm('Are you sure?')
      this.$store.dispatch('declineRequest', id)
    },
    deleteFriend (id) {
      confirm('Are you sure?')
      this.$store.dispatch('deleteFriend', id)
    },
    getPlayer () {
      this.$store.dispatch('getPlayer', this.$route.params.id)
    },
    onBack () {
      this.$router.go(-1)
    },
    updatePlayer () {
      console.log('Updating Players...')
      this.$store.dispatch('updatePlayer', this.$route.params.id)
    }
  },
  components: {
    appTeamItem: TeamItem,
    appTeamDetails: TeamDetails
  },
  // watch: {
  //   '$route.params.id' (newId, oldId) {
  //     this.$store.dispatch('resetPlayerDetails')
  //     this.getPlayer(newId)
  //   }
  // },
  activated () {
    this.$store.dispatch('resetPlayerDetails')
    console.log('Fetching player profile...')
    this.getPlayer()
  }
}
</script>

<style scoped>
  .tiled {
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }

  a {
    color: white;
  }

  header {
    border-bottom: 3px solid #666;
    margin-bottom: 15px;
  }

  a.scale-up i{
    cursor: pointer;
    transform: scale(1);
    transition: 0.3s;
  }

  a.scale-up:hover i{
    transform: scale(1.3);
    transition: 0.1s;
  }

  a.scale-up:active i{
    transform: scale(1.1); 
  }

  a.scale-up:focus i{
    transform: scale(1.1); 
  }
  
  a.btn.back {
    text-align: left;
    margin-bottom: 15px;
  }

  .img-thumbnails {
    border: 3px solid #fff;
    border-radius: 5px;
    margin-bottom: 30px;
    width: 100%;
  }

  ul {
    padding-left: 0;
  }

  li {
    list-style-type: none;
    line-height: 1.6em;
    padding-left: 15px;
  }

  li.tiled {
    margin-bottom: 10px;
  }

  ul.links {
    margin-bottom: 5px;
  }
  ul.links li {
    display: inline-block;
  }
  ul.links li a i {
    font-size: 1.8em;
  }


  .title {
    font-weight: 600;
    /* color: #106CD6; */
    color: orange;
  }

  table {
    color: white;
  }
  
  tr th.table-header {
    font-size: 20px;
    font-weight: bold;
  }
  
  tr img.img-thumbnails {
    height: 57px;
    width: 100px;
    margin: 5px;
  }
</style>