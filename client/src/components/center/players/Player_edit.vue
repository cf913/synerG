<template>
  <div class="player-edit tile gray-tile tile-shadow">
    <header class="text-center">
      <h2 class="py-3">{{ username }}</h2>
    </header>
    <div class="container">
      <b-form>
        <div class="row">
          <div class="col-sm-4">
            <b-form-group>
              <h6 class="title">Regions:</h6>
              <b-form-checkbox-group  name="flavour1" stacked v-model="regions_selected" :options="regions_options">
              </b-form-checkbox-group>
            </b-form-group>
          </div>
          <div class="col-sm-4">
            <b-form-group>
              <h6 class="title">Languages:</h6>
              <b-form-checkbox-group  name="flavour1" stacked v-model="languages_selected" :options="languages_options">
              </b-form-checkbox-group>
            </b-form-group>
          </div>
          <div class="col-sm-4">
            <b-form-group>
              <h6 class="title">Comms:</h6>
              <b-form-checkbox-group  name="flavour1" stacked v-model="comms_selected" :options="comms_options">
              </b-form-checkbox-group>
            </b-form-group>
            <br>
            <b-form-group>
              <h6 class="title">Positions:</h6>
              <b-form-checkbox-group name="flavour1" stacked v-model="positions_selected" :options="positions_options">
              </b-form-checkbox-group>
            </b-form-group>
          </div>
          <h6 class="title">Description:</h6>
          <b-form-textarea class="description"
            v-model="description"
            placeholder="Describe yourself, your playstyle, what sort of team you are looking for, etc... :D "
            :rows="3"
            :max-rows="6">
          </b-form-textarea>
        </div>
        <b-button @click.prevent="onSubmit()" variant="info">Save</b-button>
        <b-button @click.prevent="onCancel()" variant="danger">Cancel</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      username: '- UserName -',
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
        { text: 'In-Game Chat/Mic', value: 'In-Game Chat/Mic' },
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
      const data = {
        description: this.description,
        regions: this.regions_selected,
        languages: this.languages_selected,
        comms: this.comms_selected,
        positions: this.positions_selected
      }
      this.$store.dispatch('editPlayer', {data, id: this.$route.params.id})
    },
    // onReset () {
    //   this.description = ''
    //   this.regions_selected = []
    //   this.languages_selected = []
    //   this.comms_selected = []
    //   this.positions_selected = []
    // },
    onCancel () {
      this.$router.go(-1)
    }
  },
  activated () {
    if (this.$store.getters.user) {
      this.username = this.$store.getters.user.steamName
      this.description = this.$store.getters.user.description
      this.regions_selected = this.$store.getters.user.regions
      this.languages_selected = this.$store.getters.user.languages
      this.comms_selected = this.$store.getters.user.comms
      this.positions_selected = this.$store.getters.user.positions
    }
  }
}
</script>

<style scoped>

  .container {
    padding: 0 20px;
  }
  .title {
    font-weight: 600;
    color: #DAA520;
    text-align: left;
  }
  .btn {
    width: 100px;
    margin: 10px 5px;
  }
  textarea {
    background-color: #222;
    color: white;
    border-width: 2px;
  }
  textarea:focus {
    background-color: #000;
    color: white;
    border-color: orange;
  }

  .row {
    border-radius: 5px;
    margin: auto 10px;
    padding: 20px;
    margin: auto;
    background: #333;
  }

</style>
