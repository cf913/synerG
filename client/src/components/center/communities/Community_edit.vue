<template>
  <div class="community-edit text-left container tile gray-tile tile-shadow">
    <div class="">
      <div class="container py-3 text-left">
        <h2 class="py-3">{{community.communityName}}</h2>
          <form>
            <div class="tiled inner-tile">
              <div class="form-group">
                <label class="col-form-label" for="team-name">Community Name</label>
                <input type="text" class="form-control" id="community-name" name="community_name" v-model="community_name">
              </div>
            </div>
            <!--<div class="tiled inner-tile">-->
            <!--  <div class="form-group">-->
            <!--    <label for="team-logo">Team Logo</label>-->
            <!--    <input type="file" class="form-control-file" id="team-logo" name="team_logo" v-model="team_logo">-->
            <!--  </div>-->
            <!--</div>-->
            <div class="tiled inner-tile">
              <h5 class="label">Description:</h5>
              <b-form-textarea class="description"
                v-model="description"
                :rows="3"
                :max-rows="6">
              </b-form-textarea>
            </div>
            <b-button @click.prevent="onSubmit()" variant="info">Save</b-button>
            <b-button @click.prevent="onCancel()" variant="danger">Cancel</b-button>
          </form>
        </div>
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
