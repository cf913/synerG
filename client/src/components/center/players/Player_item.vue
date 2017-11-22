<template>
	<div class="player_item">
    <div class="row">
      <div class="col-sm-2">
        <a @click="$emit('playerSelected', player)"><img id="avatar" :src="player.img" alt="Avatar"></a>
      </div>
      <div class="col-sm-10">
        <a class="btn btn-primary btn-sm float-right" @click="$emit('playerSelected', player)">View Profile</a>
        <a @click="$emit('playerSelected', player)"><h5>{{ player.username }}</h5></a>
        <ul id="details">
          <li><i class="fa fa-star-o"></i>  ~{{ player.mmr | toDecimal }}K</li>
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
  #avatar {
    width: 100%;
  }

  a {
    cursor: pointer;
  }

  a:hover h4{
    text-decoration: underline;
  }

  #details li {
    list-style-type: none;
  }

</style>
