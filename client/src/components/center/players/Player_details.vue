<template>
  <div class="player_details">
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
        <a class="btn btn-primary btn-sm back" @click="onBack"><i class="fa fa-arrow-left fa-fw"></i> Back</a>
        <div class="row">
          <div class="col-4 text-left">
            <img class="img-thumbnails" :src="player.img" alt="Avatar">
            <ul>
              <li class="tiled inner-tile">
                <span class="title"><i class="fa fa-trophy fa-fw"></i> MMR:</span>
                <ul>
                  <li>Estimate: ~{{player.mmr.mmr_estimate}}</li>
                  <li>Solo: {{player.mmr.mmr_solo || '----'}}</li>
                  <li>Party: {{player.mmr.mmr_party || '----'}}</li>
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
                <li><a class="scale-up" @click="addFriend"><h3><i class="fa fa-user-plus fa-fw"></i></h3></a></li>
                <li><a :href="`http://www.steamcommunity.com/profiles/${player.steamId}`" class="scale-up" target="_blank"><h3><i class="fa fa-steam-square fa-fw"></i></h3></a></li>
                <li><a class="scale-up" @click="updatePlayer"><h3><i class="fa fa-refresh fa-fw"></i></h3></a></li>
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
                <ul id="example-1">
                  <li v-for="(hero, index) in player.heroes.slice(0,5)" :key="index">
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
    <br><br>
  </div>
</template>

<script>
export default {
  computed: {
    player () {
      return this.$store.getters.player
    },
    loading () {
      return this.$store.getters.player_loading
    }

  },
  methods: {
    addFriend () {
      this.$store.dispatch('addFriend', this.$route.params.id)
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
  created () {
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
    margin-bottom: 0;
  }
  ul.links li {
    display: inline-block;
  }

  .title {
    font-weight: 600;
    /* color: #106CD6; */
    color: orange;
  }
</style>