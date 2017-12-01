<template>
  <div class="player-edit">
    <header class="text-center">
      <h2 class="py-3">(username here)</h2>
    </header>
    <div class="container">
      <b-form>
        <div class="row">
          <div class="col-sm-4">
            <b-form-group>
              <h5 class="label">Regions:</h5>
              <b-form-checkbox-group  name="flavour1" stacked v-model="regions_selected" :options="regions_options">
              </b-form-checkbox-group>
            </b-form-group>
          </div>
          <div class="col-sm-4">
            <b-form-group>
              <h5 class="label">Languages:</h5>
              <b-form-checkbox-group  name="flavour1" stacked v-model="languages_selected" :options="languages_options">
              </b-form-checkbox-group>
            </b-form-group>
          </div>
          <div class="col-sm-4">
            <b-form-group>
              <h5 class="label">Comms:</h5>
              <b-form-checkbox-group  name="flavour1" stacked v-model="comms_selected" :options="comms_options">
              </b-form-checkbox-group>
            </b-form-group>
            <br>
            <b-form-group>
              <h5 class="label">Positions:</h5>
              <b-form-checkbox-group name="flavour1" stacked v-model="positions_selected" :options="positions_options">
              </b-form-checkbox-group>
            </b-form-group>
          </div>
          <b-form-textarea class="description"
            v-model="description"
            placeholder="Describe yourself, your playstyle, what sort of team you are looking for, etc... :D "
            :rows="3"
            :max-rows="6">
          </b-form-textarea>
        </div>
        <b-button @click.prevent="onSubmit()" variant="info">Save</b-button>
        <b-button @click.prevent="onReset()" variant="warning">Reset</b-button>
        <b-button @click.prevent="onCancel()" variant="danger">Cancel</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      description: '',
      regions_selected: [], // Must be an array reference!
      languages_selected: [],
      comms_selected: [],
      positions_selected: [],
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
      ]
    }
  },
  methods: {
    onSubmit () {
    },
    onReset () {
    },
    onCancel () {
    }
  },
  created () {

  }
}
</script>

<style scoped>

  .container {
    padding: 0 20px;
  }
  .label {
    text-align: left;
  }
  .custom-controls-stacked {
    padding-left: 20%;
  }
  .btn {
    width: 100px;
    margin: 10px 5px;
  }
  textarea {
    margin: auto 50px;
    background-color: #222;
    color: white;
    border-width: 2px;
  }
  textarea:focus {
    background-color: #000;
    color: white;
    border-color: orange;
  }

</style>
