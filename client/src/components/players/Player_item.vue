<template>
	<div class="player_item">
    <div class="row container-fluid">
      <div class="col-sm-2">
        <a @click="$emit('playerSelected', player)"><img id="avatar" :src="player.img" alt="Avatar"></a>
      </div>
      <div class="col-sm-10">
        <a class="btn btn-primary btn-xs float-right" @click="$emit('playerSelected', player)">View Profile</a>
        <a @click="$emit('playerSelected', player)"><h5>{{ player.username }}</h5></a>
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
  #avatar {
    width: 100px;
  }

  a {
    cursor: pointer;
  }

  a:hover h4{
    text-decoration: underline;
  }

</style>
