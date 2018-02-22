<template>
    <div class="news-feed text-left container tile gray-tile tile-shadow">
        <h2 class="py-3">News</h2>
        <form>
        <div class="row">
        	<div class="left col-lg-3">
        		<img class="avatar" :src="user.img" alt="Avatar">
        	</div>
        	<div class="right col-lg-9">
        		<label class="col-form-label" for="post">Post:</label>
          	<input type="text" class="form-control" id="post" name="post" v-model="post" placeholder="Write Post ...">
          	<button>Submit</button>
        	</div>
        </div>
      </form>
    </div>
</template>

<script>
export default {
	data: () => {
		return {
			post: ''
		}
	},
	computed: {
		user () {
			return !this.$store.getters.user ? 'No user logged in' : this.$store.getters.user
		}
	}
}
</script>

<style scoped>
</style>
