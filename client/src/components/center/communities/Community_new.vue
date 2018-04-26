<template>
  <div class="new-community text-left container tile gray-tile">
    <div class="container py-3 text-left">
      <h2 class="py-3 title">Create New Community</h2>
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
      this.$store.dispatch('createCommunity', {data, player})
    },
    onReset () {
      this.community_name = ''
      this.description = ''
    },
    onCancel () {
      this.$router.go(-1)
    }
  },
  activated () {
    this.onReset()
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

