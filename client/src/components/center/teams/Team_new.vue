<template>
  <div class="new-team text-left container">
    <div class="card inner-tile">
      <div class="container py-3 text-left">
        <h2 class="py-3">Create New Team</h2>
          <form>
            <div class="tiled inner-tile">
              <div class="form-group">
                <label class="col-form-label" for="team-name">Team Name</label>
                <input type="text" class="form-control" id="team-name" placeholder="Team Name">
              </div>
            </div>
            <div class="tiled inner-tile">
              <div class="form-group">
                <label for="team-logo">Team Logo</label>
                <input type="file" class="form-control-file" id="team-logo">
              </div>
            </div>
            <div class="tiled inner-tile">
              <h5 class="label">Description:</h5>
              <b-form-textarea class="description"
                v-model="description"
                placeholder="Describe what sort of players you are looking for and what your want to do as a team ..."
                :rows="3"
                :max-rows="6">
              </b-form-textarea>
            </div>
            <br>
            <!--Can have them all in the same b-form-group but spacing between them will be smaller, just preference-->
            <div class="tiled inner-tile">
              <b-form-group>
                <h5 class="label">Recruiting:</h5>
                <b-form-checkbox-group  name="positions" v-model="positions_selected" :options="positions_options">
                </b-form-checkbox-group>
              </b-form-group>
            </div>
            <div class="tiled inner-tile">
              <b-form-group>
                <h5 class="label">Languages:</h5>
                <b-form-checkbox-group  name="languages" v-model="languages_selected" :options="languages_options">
                </b-form-checkbox-group>
              </b-form-group>
            </div>
            <div class="tiled inner-tile">
              <b-form-group>
                <h5 class="label">Regions:</h5>
                <b-form-checkbox-group  name="regions" v-model="regions_selected" :options="regions_options">
                </b-form-checkbox-group>
              </b-form-group>
            </div>
            <div class="tiled inner-tile">
              <b-form-group>
                <h5 class="label">Competitiveness:</h5>
                <b-form-radio-group  name="competitive" v-model="competitive_selected" :options="competitive_options">
                </b-form-radio-group>
              </b-form-group>
            </div>
            <div class="tiled inner-tile">
              <b-form-group>
                <h5 class="label">Method of Communication:</h5>
                <b-form-checkbox-group  name="comms" v-model="comms_selected" :options="comms_options">
                </b-form-checkbox-group>
              </b-form-group>
            </div>
            <p>Need to add a timetable here of when online</p>
            <p>Show friends list here to select teammate</p>
            <b-button @click.prevent="onSubmit()" variant="info">Save</b-button>
            <b-button @click.prevent="onReset()" variant="warning">Reset</b-button>
            <b-button @click.prevent="onCancel()" variant="danger">Cancel</b-button>
          </form>
        </div>
      </div>
  </div> 
</template>

<script>
export default {
  data () {
    return {
      description: '',
      positions_selected: [],
      languages_selected: [],
      regions_selected: [],
      competitive_selected: '',
      positions_options: [
        { text: 'Carry', value: 'Carry' },
        { text: 'Midlaner', value: 'Midlaner' },
        { text: 'Offlaner', value: 'Offlaner' },
        { text: 'Farming Support', value: 'Farming Support' },
        { text: 'Hard Support', value: 'Hard Support' }
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
      competitive_options: [
        { text: 'Casual Unranked', value: 'Casual Unranked' },
        { text: 'Casual Ranked', value: 'Casual Ranked' },
        { text: 'Semi-Competitive Ranked', value: 'Semi-Competitive Ranked' },
        { text: 'Competitive Ranked', value: 'Competitive Ranked' },
        { text: 'Tournaments', value: 'Tournaments' }
      ],
      comms_options: [
        { text: 'In-Game Chat/Mic', value: 'In-Game Chat/Mic' },
        { text: 'Discord', value: 'Discord' },
        { text: 'Skype', value: 'Skype' },
        { text: 'Teamspeak', value: 'Teamspeak' }
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
  .tiled {
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
</style>

