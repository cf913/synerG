<template>
  <div class="signals-new container gray-tile text-left">
    <p class="title text-center">Send Out Signals to Other Players</p>
      <b-form>
        <h6 class="title">Position:</h6>
        <b-form-checkbox-group  name="position" v-model="position_selected" :options="position_options" required=true></b-form-checkbox-group>
        <br>
        <h6 class="title">Language:</h6>
        <b-form-checkbox-group  name="language" v-model="language_selected" :options="language_options" required=true></b-form-checkbox-group>
        <br>
        <h6 class="title">Server:</h6>
        <b-form-checkbox-group  name="region" v-model="region_selected" :options="region_options" required=true></b-form-checkbox-group>
        <br>
        <h6 class="title">Aims:</h6>
        <b-form-radio-group  name="competitive" v-model="competitive_selected" :options="competitive_options" required=true></b-form-radio-group>
        <br>
        <h6 class="title">Comments:</h6>
        <b-form-input type="text" class="form-control" id="signalDescription" v-model="description" placeholder="Additional Information..."></b-form-input>
        <div class="d-flex justify-content-end align-items-center">
          <b-button type="submit" @click.prevent="newPlayerSignal" @keyup.enter.prevent="newPlayerSignal">Send out a signal!</b-button>
        </div>
      </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      language_selected: [],
      region_selected: [],
      competitive_selected: '',
      position_selected: [],
      description: '',
      position_options: [
        { text: 'Carry', value: 'Carry' },
        { text: 'Midlane', value: 'Midlane' },
        { text: 'Offlane', value: 'Offlane' },
        { text: 'Farming Support', value: 'Farming Support' },
        { text: 'Hard Support', value: 'Hard Support' }
      ],
      language_options: [
        { text: 'English', value: 'English' },
        { text: 'Chinese', value: 'Chinese' },
        { text: 'French', value: 'French' },
        { text: 'Korean', value: 'Korean' },
        { text: 'Portuguese', value: 'Portuguese' },
        { text: 'Russian', value: 'Russian' },
        { text: 'Spanish', value: 'Spanish' }
      ],
      region_options: [
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
      competitive_options: [
        { text: 'Casual Unranked', value: 'Casual Unranked' },
        { text: 'Casual Ranked', value: 'Casual Ranked' },
        { text: 'Semi-Competitive Ranked', value: 'Semi-Competitive Ranked' },
        { text: 'Competitive Ranked', value: 'Competitive Ranked' },
        { text: 'Tournaments', value: 'Tournaments' }
      ]
    }
  },
  methods: {
    newPlayerSignal () {
      const data = {
        language: this.language_selected,
        region: this.region_selected,
        competitive: this.competitive_selected,
        position: this.position_selected,
        description: this.description
      }
      if (data.position.length < 1) {
        return alert('Please fill in the position field')
      }
      if (data.language.length < 1) {
        return alert('Please fill in the language field')
      }
      if (data.region.length < 1) {
        return alert('Please fill in the server field')
      }
      if (data.competitive.length < 1) {
        return alert('Please fill in the aims field')
      }
      this.$store.dispatch('newPlayerSignal', data)
      this.$emit('backToSearch', 'app-signals-search')
    },
    onReset () {
      this.description = ''
      this.language_selected = []
      this.region_selected = []
      this.competitive_selected = ''
      this.position_selected = []
    },
    getSignals () {
      this.$store.dispatch('getSignals')
    }
  },
  computed: {
    user () {
      return !this.$store.getters.user ? 'No user logged in' : this.$store.getters.user
    },
    signals () {
      return this.$store.getters.signals
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

  .title {
    font-weight: 600;
    color: #DAA520;
  }

  .text-center {
    text-align: center;
  }

  /*SENDING SIGNAL STYLING*/

  .padding-0{
    padding: 0 10px;
  }

  .maxwidth{
    width: 100%;
    margin: 0;
  }

  input.form-control {
    background-color: #21272c;
    border: none;
    border-bottom: solid 1px #f00;
    border-radius: 0;
    color: #fff;
  }

  input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #fff;
    opacity: 1; /* Firefox */
  }

  input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #fff;
  }
  
  input::-ms-input-placeholder { /* Microsoft Edge */
    color: #fff;
  }
</style>
