<template>
	<div class="player_item">
    <div class="row">
      <div class="col-sm-2">
        <img id="avatar" :src="player.img" alt="Avatar">
      </div>
      <div class="col-sm-10">
        <a class="btn btn-info btn-sm float-right">Steam Profile</a>
        <router-link class="btn btn-primary btn-sm float-right" :to="{ path: `/players/${player.steamId}`}">PlayerProfile</router-link>
        <router-link :to="{ path: `/players/${player.steamId}`}"><h5>{{ player.steamName }}</h5></router-link>
        <ul id="details">
          <li><i class="fa fa-trophy"></i>  ~{{ player.mmr.mmr_estimate | toDecimal }}K</li>
          <li><i class="fa fa-map-marker"></i> EU, OCE</li>
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
  },
  filters: {
    toDecimal (value, decimals) {
      if (!value) {
        value = 0
      }
      if (!decimals) {
        decimals = 1
      }
      value = (value / 1000).toFixed(1)
      return value
    }
  }
}
</script>

<style scoped>

  a.btn {
    margin-left: 10px;
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

  #details i {
    font-size: 1.2em;
    color: #ddd;
    margin-right: 4px;
  }

  ul#details {
    background: #222;
    padding: 10px;
    padding-left: 20px;
    border-radius: 3px;
  }
  #details li {
    padding: 2px 0;
    list-style-type: none;
    font-size: 0.9em;
  }

</style>
