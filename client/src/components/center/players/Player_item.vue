<template>
	<div class="player_item">
    <div class="row">
      <div class="col-sm-2">
        <img id="avatar" :src="player.img" alt="Avatar">
      </div>
      <div class="col-sm-10">
        <a class="btn btn-info btn-sm float-right" target="_blank" :href="`http://www.steamcommunity.com/profiles/${player.steamId}`"><i class="fa fa-steam fa-fw"></i></a>
        <router-link class="btn btn-primary btn-sm float-right" :to="{ path: `/players/${player.steamId}/add`}"><i class="fa fa-user-plus fa-fw"></i></router-link>
        <!-- <router-link class="btn btn-warning btn-sm float-right" :to="{}"><i class="fa fa-comment fa-fw"></i></router-link> -->
        <router-link class="btn btn-warning btn-sm float-right" :to="{ path: `/players/${player.steamId}`}"><i class="fa fa-user-circle-o fa-fw"></i></router-link>
        <router-link :to="{ path: `/players/${player.steamId}`}"><h5>{{ player.steamName }}</h5></router-link>
        <ul class="d-flex details inner-2-tile">
          <li v-if="player.mmr.mmr_estimate"><i class="fa fa-trophy fa-fw"></i>
            ~{{ player.mmr.mmr_estimate | toDecimal }}K
            <!--<div v-if="player.mmr.mmr_solo">-->
              <!--(s) {{ player.mmr.mmr_solo | toDecimal }}K-->
            <!--</div>-->
            <!--<div v-if="player.mmr.mmr_party">-->
              <!--(p) {{ player.mmr.mmr_party  | toDecimal }}K-->
            <!--</div>-->
          </li>
          <li v-if="player.regions.length !== 0"><i class="fa fa-map-marker fa-fw"></i> {{ player.regions | displayListContent }}</li>
          <li v-if="player.languages.length !== 0"><i class="fa fa-globe fa-fw"></i> {{ player.languages | displayListContent }}</li>
          <li v-if="player.comms.length !== 0"><i class="fa fa-microphone fa-fw"></i> {{ player.comms | displayListContent }}</li>
          <li v-if="player.positions.length !== 0"><i class="fa fa-pie-chart fa-fw"></i> {{ player.positions | displayListContent }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['player'],
  data: () => {
    return {
    }
  }
}
</script>

<style scoped>

  a.btn {
    margin-left: 8px;
  }
  a.btn i {
    font-size: 1em;
  }
  #avatar {
    width: 100%;
    border: 3px solid #fff;
    border-radius: 5px;
  }

  a {
    cursor: pointer;
    color: white;
  }

  h5 {
    display: inline-block;
    margin-bottom: 15px;
  }

  a:hover h5{
    text-decoration: underline;
  }

  .details i {
    font-size: 1.2em;
    color: #ddd;
    margin-right: 4px;
  }

  ul.details {
    /* background: #222; */
    padding: 10px;
    padding-left: 20px;
    border-radius: 3px;
    flex-wrap: wrap;
  }
  .details li {
    padding: 2px 0;
    list-style-type: none;
    font-size: 0.9em;
    flex-basis: calc(48%);
  }

</style>
