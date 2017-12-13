<template>
  <div class="filter tile gray-tile tile-shadow">
    <h4 class="py-3">Filter Players</h4>
    <div class="container inner-tile">
      <b-form>
        <div class="row">
          <div class="col-sm-6">
            <b-form-group>
              <h5 class="label">Regions:</h5>
              <b-form-checkbox-group stacked v-model="regions_selected" :options="regions_options">
              </b-form-checkbox-group>
            </b-form-group>
          </div>
          <div class="col-sm-6">
            <b-form-group>
              <h5 class="label">Languages:</h5>
              <b-form-checkbox-group stacked v-model="languages_selected" :options="languages_options">
              </b-form-checkbox-group>
            </b-form-group>
            <b-form-group>
              <h5 class="label">Comms:</h5>
              <b-form-checkbox-group stacked v-model="comms_selected" :options="comms_options">
              </b-form-checkbox-group>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <b-form-group>
              <h5 class="label">Positions:</h5>
              <b-form-checkbox-group stacked v-model="positions_selected" :options="positions_options">
              </b-form-checkbox-group>
            </b-form-group>
          </div>
          <div class="col-sm-6">
            <b-form-group>
              <h5 class="label">MMR:</h5>
              <b-form-checkbox-group stacked v-model="mmr_selected" :options="mmr_options">
              </b-form-checkbox-group>
            </b-form-group>
          </div>
        </div>
        <b-button @click.prevent="onSubmit()" variant="info"><i class="fa fa-search"></i> Search</b-button>
        <b-button @click.prevent="onReset()" variant="warning">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '- UserName -',
      regions_selected: [], // Must be an array reference!
      languages_selected: [],
      comms_selected: [],
      positions_selected: [],
      mmr_selected: [],
      regions_options: [
        { text: 'Chile', value: 'Chile' },
        { text: 'China', value: 'China' },
        { text: 'Dubai', value: 'Dubai' },
        { text: 'EU West', value: 'EU West' },
        { text: 'EU East', value: 'EU East' },
        { text: 'Japan', value: 'Japan' },
        { text: 'Australia', value: 'Australia' },
        { text: 'Russia', value: 'Russia' },
        { text: 'SEA', value: 'SEA' },
        { text: 'South Africa', value: 'South Africa' },
        { text: 'US West', value: 'US West' },
        { text: 'US East', value: 'US East' }
      ],
      languages_options: [
        { text: 'English', value: 'English' },
        { text: 'Chinese', value: 'Chinese' },
        { text: 'French', value: 'French' },
        { text: 'Korean', value: 'Korean' },
        { text: 'Portuguese', value: 'Portuguese' },
        { text: 'Russian', value: 'Russian' },
        { text: 'Spanish', value: 'Spanish' }
      ],
      comms_options: [
        { text: 'Discord', value: 'Discord' },
        { text: 'TeamSpeak', value: 'TeamSpeak' },
        { text: 'Skype', value: 'Skype' }
      ],
      positions_options: [
        { text: 'Carry', value: 'Carry' },
        { text: 'Midlaner', value: 'Midlaner' },
        { text: 'Offlaner', value: 'Offlaner' },
        { text: 'Farming Support', value: 'Farming Support' },
        { text: 'Hard Support', value: 'Hard Support' }
      ],
      mmr_options: [
        {text: '< 1k', value: {min: 0, max: 999}},
        {text: '1k - 2k', value: {min: 1000, max: 1999}},
        {text: '2k - 3k', value: {min: 2000, max: 2999}},
        {text: '3k - 4k', value: {min: 3000, max: 3999}},
        {text: '4k - 5k', value: {min: 4000, max: 4999}},
        {text: '5k - 7k', value: {min: 5000, max: 6999}},
        {text: '> 7k', value: {min: 7000, max: 99999}}
      ]
    }
  },
  methods: {
    onSubmit () {
      const data = {
        regions: this.regions_selected,
        languages: this.languages_selected,
        comms: this.comms_selected,
        positions: this.positions_selected,
        mmr: this.mmr_selected
      }
      this.$store.dispatch('getPlayers', data)
    },
    onReset () {
      this.regions_selected = []
      this.languages_selected = []
      this.comms_selected = []
      this.positions_selected = []
      this.mmr_selected = []
      this.$store.dispatch('getPlayers', {})
    }
  }
}
</script>

<style scoped>
  .filter {
    color: white;
    font-size: 0.9em;
    padding-bottom: 15px;
  }

  .custom-controls-stacked {
    padding-left: 15%;
  }
  .container {
    border-radius: 5px;
    padding-top: 10px;
    width: 90%;
    /* background: #222; */
  }
  .label {
    font-size: 1.2em;
    font-weight: bold;
    color: #106CD6;
    text-align: left;
  }
  .btn {
    margin: auto 5px; 
    margin-bottom: 20px;
  }
</style>
