<template>
  <div class="community-edit text-left container tile gray-tile">
    <div class="container py-3 text-left">
      <h2 class="py-3 title">{{community.communityName}}</h2>
      <form>
        <h6 class="title">Community Name</h6>
        <input type="text" class="form-control" id="community-name" name="community_name" v-model="community_name" placeholder="Community Name">
        <br>
        <!--<div class="tiled inner-tile">-->
        <!--  <div class="form-group">-->
        <!--    <label for="team-logo">Team Logo</label>-->
        <!--    <input type="file" class="form-control-file" id="team-logo" name="team_logo" v-model="team_logo">-->
        <!--  </div>-->
        <!--</div>-->
        <h6 class="title">Description:</h6>
        <b-form-textarea class="description"
          v-model="description"
          placeholder="What is your community about?"
          :rows="3"
          :max-rows="6">
        </b-form-textarea>
        <br>
        <div class="d-flex justify-content-end align-items-center">
          <b-button @click.prevent="onCancel()" variant="danger">Cancel</b-button>
          <b-button type="submit" @click.prevent="onSubmit()" variant="info">Save</b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      community_name: '',
      description: ''
    }
  },
  computed: {
    community () {
      return this.$store.getters.community
    }
  },
  methods: {
    onSubmit () {
      const data = {
        communityName: this.community_name,
        description: this.description
      }
      this.$store.dispatch('editCommunity', {data, id: this.$route.params.id})
    },
    onCancel () {
      this.$router.go(-1)
    }
  },
  activated () {
    const community = this.$store.getters.community
    this.community_name = community.communityName
    this.description = community.description
  }
}
</script>

<style scoped>
  .tiled {
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
</style>
