<template>
  <div class="signals-search container gray-tile tile">
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
          <b-form-group horizontal label-text-align="left" label="Player or Team Signals?" label-cols="4">
            <div class="radio-buttons">
              <b-form-radio-group v-model="type_selected" :options="type_options"></b-form-radio-group>
            </div>
          </b-form-group>
        </div>
      </div>
      <div class="d-flex justify-content-end align-items-center">
        <b-button size="sm" type="reset" @click.prevent="onReset()" variant="link" id="reset">Clear</b-button>
        <b-button size="sm" type="submit" @click.prevent="onSubmit()" @keyup.enter.prevent="onSubmit" variant="warning" id="search"><i class="fa fa-search"></i> Search</b-button>
      </div>
    </b-form>
    <ul class="list-group clearfix" id="signals-list">
      <li class="list-group-item inner-tile" v-for="(signal, index) in signals" :key="index">
        <div class="row">
          <div class="left col-lg-3">
            <img v-if="signal.isPlayer" class="signal-avatar" :src="signal.player.img" alt="Avatar">
            <img v-else class="signal-avatar" src="http://assets.worldwildlife.org/photos/479/images/story_full_width/giant-panda-shutterstock_86500690.jpg?1345572346" alt="Avatar"> 
          </div>
          <div class="right signal-info col-lg-9">
            <router-link v-if="signal.isPlayer" :to="{ name: 'playerDetails', params: {id: signal.player._id}}"><h5>Player - {{signal.player.steamName}}</h5></router-link>
            <router-link v-else :to="{ name: 'teamDetails', params: {id: signal.team._id}}"><h5>Team - {{signal.team.teamName}}</h5></router-link>
            <h6><span class="title">Position:</span> {{signal.position | displayListContent}}</h6>
            <h6><span class="title">Language:</span> {{signal.language | displayListContent}}</h6>
            <h6><span class="title">Server:</span> {{signal.region | displayListContent}}</h6>
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
      type_selected: null,
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
      ],
      type_options: [
        { text: 'Player', value: true },
        { text: 'Team', value: false }
      ]
    }
  },
  methods: {
    onSubmit () {
      const data = {
        region: this.region_selected,
        language: this.language_selected,
        position: this.position_selected,
        competitiveness: this.competitive_selected,
        isPlayer: this.type_selected
      }
      this.$store.dispatch('getSignals', data)
    },
    onReset () {
      this.region_selected = null
      this.language_selected = null
      this.type_selected = null
      this.position_selected = null
      this.competitive_selected = null
      this.$store.dispatch('getSignals', {})
    },
    getSignals () {
      return this.$store.dispatch('getSignals')
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

  div.signal-info {
    text-align: left;
  }

  div.radio-buttons {
    padding-top: .375rem;
  }

  ul.list-group {
    margin-top: 15px;
  }

  li.list-group-item {
    margin-bottom: 10px;
  }

    /* BUTTONS */
  #reset {
    margin: 0 5px;
    color: white;
    cursor: pointer;
  }

  #search {
    cursor: pointer;
  }

  #signals-list {
    overflow-y: scroll;
    height: 70vh;
  }
</style>
