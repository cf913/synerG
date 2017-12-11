<template>
  <div class="player_details">
    <!-- WHILE LOADING -->
    <div v-if="loading" class="text-center">
      <div class="text-center">
        <h2 class="py-3">...</h2>
      </div>
      <p class="lead">Baking bread...</p>
      <img src="../../../assets/loading.svg" alt="">
    </div>
    <!-- CONTENT -->
    <div v-else>
      <div class="container py-3">
        <div class="row">
          <div class="col-4 text-left">
            <img class="img-thumbnail" :src="player.img" alt="Avatar">
            <ul>
              <li class="tiled">
                <span><i class="fa fa-trophy fa-fw"></i> MMR:</span>
                <ul>
                  <li>Estimate: ~{{player.mmr.mmr_estimate}}</li>
                  <li>Solo: {{player.mmr.mmr_solo}}</li>
                  <li>Party: {{player.mmr.mmr_party}}</li>
                </ul>
              </li>
              <li class="tiled">
                <span><i class="fa fa-map-marker fa-fw"></i> Regions:</span>
                <ul v-for="(region, index) in player.regions" :key="index">
                  <li>{{region}}</li>
                </ul>
              </li>
              <li class="tiled">
                <span><i class="fa fa-globe fa-fw"></i> Languages:</span>
                <ul v-for="(language, index) in player.languages" :key="index">
                  <li>{{language}}</li>
                </ul>
              </li>
              <li class="tiled">
                <span><i class="fa fa-headphones fa-fw"></i> Comms:</span>
                <ul v-for="(comm, index) in player.comms" :key="index">
                  <li>{{comm}}</li>
                </ul>
              </li>
              <li class="tiled">
                <span><i class="fa fa-pie-chart fa-fw"></i> Positions:</span>
                <ul v-for="(position, index) in player.positions" :key="index">
                  <li>{{position}}</li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="col-8 text-left">
            <header class="d-flex justify-content-between align-items-center">
              <h2>{{player.steamName}}</h2>
              <a :href="`http://www.steamcommunity.com/profiles/${player.steamId}`" class="scale-up" target="_blank"><h3><i class="fa fa-steam-square"></i></h3></a>
            </header>
            <p class="tiled">{{player.description}}</p>
          </div>
        </div>
      </div>

    </div>
    <br><br>
    <a class="btn btn-primary" @click="onBack">Back To Playerlist</a>
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
    getPlayer () {
      this.$store.dispatch('getPlayer', this.$route.params.id)
    },
    onBack () {
      this.$router.go(-1)
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
    background: #222;
    border-radius: 5px;
  }

  a {
    color: white;
  }

  header {
    margin-top: 50px;
    border-bottom: 3px solid #666;
    margin-bottom: 15px;
  }

  a.scale-up {
    transform: scale(1);
    transition: 0.3s;
  }

  a.scale-up:hover {
    transform: scale(1.7) translateX(-5px);
    transition: 0.1s;
  }

  .img-thumbnail {
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

  li span {
    font-weight: 600;
    /* color: #106CD6; */
    color: orange;
  }
</style>