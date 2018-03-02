<template>
  <div class="new-team text-left container tile gray-tile tile-shadow">
    <div class="">
      <div class="container py-3 text-left">
        <h2 class="py-3">Create New Community</h2>
          <form>
            <div class="tiled inner-tile">
              <div class="form-group">
                <label class="col-form-label" for="community-name">Community Name</label>
                <input type="text" class="form-control" id="community-name" name="community_name" v-model="community_name" placeholder="Community Name">
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
                placeholder="Describe what sort of players you are looking for and what your want to do as a team ..."
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
  methods: {
    onSubmit () {
      const user = this.$store.getters.user
      const data = {
        communityName: this.community_name,
        description: this.description
      }
      const player = {
        player: user._id
      }
      console.log(data)
      this.$store.dispatch('createTeam', {data, player})
    },
    onCancel () {
      this.$router.go(-1)
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
  
  th,td{
    margin: 0;
    text-align: center;
    border-collapse: collapse;
    outline: 1px solid #e3e3e3;
  }

  td{
    padding: 5px 10px;
  }
  
  td.selected{
    background-color: green;
  }

  th{
    background: #666;
    color: white;
    padding: 5px 10px;
  }
</style>

