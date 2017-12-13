<template>
  <div class="new-team">
    <h2 class="py-3">Teams</h2>
      <form>
        <div class="form-group">
          <label for="team-logo">Team Logo</label>
          <input type="file" class="form-control-file" id="team-logo">
        </div>

        <div class="form-group">
          <label class="col-form-label" for="team-name">Team Name</label>
          <input type="text" class="form-control" id="team-name" placeholder="Team Name">
        </div>
        
          <b-form-group>
            <h5 class="label">Main Regions:</h5>
            <b-form-checkbox-group  name="regions" v-model="regions_selected" :options="regions_options">
            </b-form-checkbox-group>
          </b-form-group>

        <p>Show friends list here to select teammate</p>


        <b-button @click.prevent="onSubmit()" variant="info">Save</b-button>
        <b-button @click.prevent="onReset()" variant="warning">Reset</b-button>
        <b-button @click.prevent="onCancel()" variant="danger">Cancel</b-button>
      </form> 
  </div> 
</template>

<script>
export default {
  data () {
    return {
      regions_selected: [],
      regions_options: [
        { text: 'NA', value: 'NA' },
        { text: 'SA', value: 'SA' },
        { text: 'EU', value: 'EU' },
        { text: 'ME', value: 'ME' },
        { text: 'AF', value: 'AF', title: 'Africa' },
        { text: 'AM', value: 'AM' },
        { text: 'SEA', value: 'SEA' },
        { text: 'OCE', value: 'OCE' }
      ]
    }
  },
  methods: {
    onCancel () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>

