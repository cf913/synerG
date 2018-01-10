<template>
  <div class="profile">
    <div v-if="isLoggedIn">
      <div class="card inner-tile">
        <div class="container py-3 text-left">
          <div class="row">
            <div class="col-4 text-left">
              <img class="img-thumbnails" :src="user.img" alt="Avatar">
              <ul>
                <li class="tiled inner-tile">
                  <span class="title"><i class="fa fa-trophy fa-fw"></i> MMR:</span>
                  <ul>
                    <li>Estimate: ~{{user.mmr.mmr_estimate}}</li>
                    <li>Solo: {{user.mmr.mmr_solo || '----'}}</li>
                    <li>Party: {{user.mmr.mmr_party || '----'}}</li>
                  </ul>
                </li>
                <li class="tiled inner-tile">
                  <span class="title"><i class="fa fa-map-marker fa-fw"></i> Regions:</span>
                  <ul v-for="(region, index) in user.regions" :key="index">
                    <li>{{region}}</li>
                  </ul>
                </li>
                <li class="tiled inner-tile">
                  <span class="title"><i class="fa fa-globe fa-fw"></i> Languages:</span>
                  <ul v-for="(language, index) in user.languages" :key="index">
                    <li>{{language}}</li>
                  </ul>
                </li>
                <li class="tiled inner-tile">
                  <span class="title"><i class="fa fa-headphones fa-fw"></i> Comms:</span>
                  <ul v-for="(comm, index) in user.comms" :key="index">
                    <li>{{comm}}</li>
                  </ul>
                </li>
                <li class="tiled inner-tile">
                  <span class="title"><i class="fa fa-pie-chart fa-fw"></i> Positions:</span>
                  <ul v-for="(position, index) in user.positions" :key="index">
                    <li>{{position}}</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="col-8 text-left">
              <header class="d-flex justify-content-between align-items-center">
                <h2>{{user.steamName}}</h2>
                <ul class="links">
                  <li><router-link :to="{ path: `/players/${userId}/edit`}" class="scale-up"><i class="fa fa-edit"></i></router-link></li>
                  <li><a :href="`http://www.steamcommunity.com/profiles/${user.steamId}`" class="scale-up" target="_blank"><i class="fa fa-steam-square fa-fw"></i></a></li>
                  <li><a href="#" class="scale-up" @click="updatePlayer"><i class="fa fa-refresh fa-fw"></i></a></li>
                </ul>
              </header>
              <div class="tiled description inner-tile">
                <p>
                  <span class="title">Description:</span><br>
                  {{user.description}}
                </p>
              </div>
              <div class="tiled heroes inner-tile">
                <p> 
                  <span class="title">Most Played Heroes</span>
                  <ul id="example-1">
                    <li v-for="(hero, index) in user.heroes.slice(0,5)" :key="index">
                      {{ hero }}
                    </li>
                  </ul>
                </p>
              </div>
              <div class="tiled teams inner-tile">
                <p class="title">Teams</p>
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
    </div>
    <div v-else>
      <a id="steamBtn" href="/auth/steam/steam" @click="getSteamInfo" class="btn btn-primary btn-lg">Login with Steam</a>
    </div>

  </div>
</template>


<script>
export default {
  computed: {
    user () {
      return !this.$store.getters.user ? 'No user logged in' : this.$store.getters.user
    },
    userId () {
      return this.$store.getters.userId
    },
    isLoggedIn () {
      return true // this.$store.getters.isAuthenticated
    },
    inSent () {
      if (this.$store.getters.user) return this.$store.getters.user.friends.pending_sent.includes(this.user.steamId)
      else return false
    },
    inReceived () {
      if (this.$store.getters.user) return this.$store.getters.user.friends.pending_received.includes(this.user.steamId)
      else return false
    },
    inAccepted () {
      if (this.$store.getters.user) return this.$store.getters.user.friends.accepted.includes(this.user.steamId)
      else return false
    }
  },
  methods: {
    getSteamInfo () {
    },
    sendRequest (id) {
      this.$store.dispatch('sendRequest', id)
    },
    updatePlayer () {
      console.log('Updating Players...')
      this.$store.dispatch('updatePlayer', this.$route.params.id)
    }
  }
}
</script>

<style scoped>
  
  .tiled {
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
  
  h2{
    color: white;
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
  
  #steamBtn {
    margin: 10px auto;
  }
</style>
