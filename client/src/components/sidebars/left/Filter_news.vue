<template>
  <div class="players tile gray-tile tile-shadow">
    <b-nav justified tabs class="top-tabs">
      <b-nav-item class="tab" to="/" exact :disabled="!isLoggedIn"><i class="fa fa-newspaper-o"></i></b-nav-item>
      <b-nav-item class="tab" :to="{ name: 'playerDetails', params: { id: user._id }}" :disabled="!isLoggedIn"><i class="fa fa-user-circle-o"></i></b-nav-item>
      <b-nav-item class="tab" to="/myteams" :disabled="!isLoggedIn"><i class="fa fa-group"></i></b-nav-item>
      <b-nav-item class="tab" to="/friends" :disabled="!isLoggedIn">
        <i class="fa fa-address-book"></i>
        <div class="notification" v-if="isLoggedIn && notif_friends > 0"><p>{{notif_friends}}</p></div>
      </b-nav-item>
      <b-nav-item class="tab" to="/messages" :disabled="!isLoggedIn"><i class="fa fa-comments"></i></b-nav-item>
      <b-nav-item class="tab" to="/settings" :disabled="!isLoggedIn"><i class="fa fa-gear"></i></b-nav-item>
    </b-nav>
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
