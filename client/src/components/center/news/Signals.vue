<template>
  <div class="signals container">
    <h2 class="py-3">Signals</h2>
      <div class="row container">
        <div class="left col-lg-2">
          <img class="avatar" :src="user.img" alt="Avatar">
        </div>
        <div class="right col-lg-10">
          <h5>Send out a signal to look for a team</h5>
          <b-form>
            <b-form-group horizontal label-text-align="left" label="Position" label-for="signalPosition">
              <b-form-select id="signalPosition" v-model="position_selected" :options="position_options" required></b-form-select>
            </b-form-group>
            <b-form-group horizontal label-text-align="left" label="Language" label-for="signalLanguage">
              <b-form-select id ="signalLanguage" v-model="language_selected" :options="language_options" required></b-form-select>
            </b-form-group>
            <b-form-group horizontal label-text-align="left" label="Region" label-for="signalRegion">
              <b-form-select id="signalRegion" v-model="region_selected" :options="region_options" required></b-form-select>
            </b-form-group>
            <b-form-group horizontal label-text-align="left" label="Competitive Level" label-for="signalCompetitive">
              <b-form-select id="signalCompetitive" v-model="competitive_selected" :options="competitive_options" required></b-form-select>
            </b-form-group>
            <b-form-group horizontal label-text-align="left" label="Comments" label-for="signalDescription">
              <b-form-input type="text" class="form-control" id="signalDescription" v-model="description" placeholder="Additional Information..."></b-form-input>
            </b-form-group>
            <b-button type="submit" @click.prevent="newSignal" @keyup.enter.prevent="newSignal">Send out a signal!</b-button>
          </b-form>
        </div>
      </div>
    <div class="tiled inner-tile">
      <ul class="list-group clearfix" v-for="(signal, index) in signals" :key="index">
        <li class="list-group-item inner-tile">
          <div class="row">
            <div class="left col-lg-3">
              <img class="signal-avatar" :src="signal.player.img" alt="Avatar">
            </div>
            <div class="right col-lg-9">
              <router-link :to="{ name: 'playerDetails', params: {id: signal.player._id}}"><h5>{{signal.player.steamName}}</h5></router-link>
              <h6>{{signal.position}} player looking for a {{signal.language}} team playing in the {{signal.region}} server to play {{signal.competitiveness}}</h6>
              <h6>{{signal.description}}</h6>
            </div>
          </div>
        </li>
      </ul>
    </div>
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
        { text: 'Position', value: null },
        { text: 'Carry', value: 'Carry' },
        { text: 'Midlane', value: 'Midlane' },
        { text: 'Offlane', value: 'Offlane' },
        { text: 'Farming Support', value: 'Farming Support' },
        { text: 'Hard Support', value: 'Hard Support' }
      ],
      language_options: [
        { text: 'Language', value: null },
        { text: 'English', value: 'English' },
        { text: 'Chinese', value: 'Chinese' },
        { text: 'French', value: 'French' },
        { text: 'Korean', value: 'Korean' },
        { text: 'Portuguese', value: 'Portuguese' },
        { text: 'Russian', value: 'Russian' },
        { text: 'Spanish', value: 'Spanish' }
      ],
      region_options: [
        { text: 'Region', value: null },
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
        { text: 'Competitiveness', value: null },
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
  .avatar{
    max-height: 100%;
    max-width: 100%;
  }
  .tiled {
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
  .signal-avatar {
    max-height: 90px;
    max-width: 90px;
  }
</style>
