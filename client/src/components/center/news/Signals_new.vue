<template>
  <div class="signals container gray-tile">
    <p class="title">Send out a signal to other players</p>
    <b-form>
      <div class="row maxwidth">
        <div class="col-lg-6 padding-0">
          <b-form-group horizontal label-text-align="left" label="Position:">
            <b-form-select id="signalPosition" v-model="position_selected" :options="position_options" required></b-form-select>
          </b-form-group>
        </div>
        <div class="col-lg-6 padding-0">
          <b-form-group horizontal label-text-align="left" label="Language:">
            <b-form-select id ="signalLanguage" v-model="language_selected" :options="language_options" required></b-form-select>
          </b-form-group>
        </div>
      </div>
      <div class="row maxwidth">
        <div class="col-lg-6 padding-0">
          <b-form-group horizontal label-text-align="left" label="Region:">
            <b-form-select id="signalRegion" v-model="region_selected" :options="region_options" required></b-form-select>
          </b-form-group>
        </div>
        <div class="col-lg-6 padding-0">
          <b-form-group horizontal label-text-align="left" label="Aims:">
            <b-form-select id="signalCompetitive" v-model="competitive_selected" :options="competitive_options" required></b-form-select>
          </b-form-group>
        </div>
      </div>
      <div class="row maxwidth">
        <div class="col-lg-12 padding-0">
          <b-form-group horizontal label-text-align="left" label="Comments:" label-cols="2">
            <b-form-input type="text" class="form-control" id="signalDescription" v-model="description" placeholder="Additional Information..."></b-form-input>
          </b-form-group>
        </div>
      </div>
      <div class="d-flex justify-content-end align-items-center">
        <b-button type="submit" @click.prevent="newSignal" @keyup.enter.prevent="newSignal">Send out a signal!</b-button>
      </div>
    </b-form>
    <ul class="list-group clearfix">
      <li class="list-group-item inner-tile" v-for="(signal, index) in signals" :key="index">
        <div class="row">
          <div class="left col-lg-3">
            <img class="signal-avatar" :src="signal.player.img" alt="Avatar">
          </div>
          <div class="right signal-info col-lg-9">
            <router-link :to="{ name: 'playerDetails', params: {id: signal.player._id}}"><h5>{{signal.player.steamName}}</h5></router-link>
            <h6><span class="title">Position:</span> {{signal.position}}</h6>
            <h6><span class="title">Language:</span> {{signal.language}}</h6>
            <h6><span class="title">Server:</span> {{signal.region}}</h6>
            <h6><span class="title">Competitiveness:</span> {{signal.competitiveness}}</h6>
            <h6>{{signal.description}}</h6>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      language_selected: null,
      region_selected: null,
      competitive_selected: null,
      position_selected: null,
      description: '',
      position_options: [
        { text: 'Position', value: null, disabled: true },
        { text: 'Carry', value: 'Carry' },
        { text: 'Midlane', value: 'Midlane' },
        { text: 'Offlane', value: 'Offlane' },
        { text: 'Farming Support', value: 'Farming Support' },
        { text: 'Hard Support', value: 'Hard Support' }
      ],
      language_options: [
        { text: 'Language', value: null, disabled: true },
        { text: 'English', value: 'English' },
        { text: 'Chinese', value: 'Chinese' },
        { text: 'French', value: 'French' },
        { text: 'Korean', value: 'Korean' },
        { text: 'Portuguese', value: 'Portuguese' },
        { text: 'Russian', value: 'Russian' },
        { text: 'Spanish', value: 'Spanish' }
      ],
      region_options: [
        { text: 'Region', value: null, disabled: true },
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
        { text: 'Competitiveness', value: null, disabled: true },
        { text: 'Casual Unranked', value: 'Casual Unranked' },
        { text: 'Casual Ranked', value: 'Casual Ranked' },
        { text: 'Semi-Competitive Ranked', value: 'Semi-Competitive Ranked' },
        { text: 'Competitive Ranked', value: 'Competitive Ranked' },
        { text: 'Tournaments', value: 'Tournaments' }
      ]
    }
  },
  methods: {
    newSignal () {
      const data = {
        language: this.language_selected,
        region: this.region_selected,
        competitive: this.competitive_selected,
        position: this.position_selected,
        description: this.description
      }
      console.log(data)
      this.$store.dispatch('newSignal', data)
      this.position_selected = null
      this.language_selected = null
      this.region_selected = null
      this.competitive_selected = null
      this.description = ''
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
    console.log('fetching signals')
    this.getSignals()
  }
}
</script>

<style scoped>
  .tiled {
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
  .signal-avatar {
    max-height: 90px;
    max-width: 90px;
  }

  div.signals.container {
    margin-top: 10px;
  }

  .title {
    font-weight: 600;
    /* color: #106CD6; */
    color: #DAA520;
  }

  /*SENDING SIGNAL STYLING*/

  .padding-0{
    padding: 0 10px;
  }

  .maxwidth{
    width: 100%;
    margin: 0;
  }

  fieldset.form-group {
    margin: 3px 0;
  }

  legend.col-form-legend {
    padding-top: .6rem;
    padding-bottom: .5rem;
  }

  select.custom-select {
    color: #fff;
    background-color: #21272c;
    border: none;
    border-bottom: solid 1px #f00;
    border-radius: 0;
  }

  select.custom-select option {
    color: black;
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

  div.signal-info {
    text-align: left;
  }

  ul.list-group {
    margin-top: 15px;
  }

  li.list-group-item {
    margin-bottom: 10px;
  }
</style>
