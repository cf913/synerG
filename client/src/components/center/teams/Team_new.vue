<template>
  <div class="new-team text-left container tile gray-tile tile-shadow">
    <div class="">
      <div class="container py-3 text-left">
        <h2 class="py-3">Create New Team</h2>
          <form>
            <div class="tiled inner-tile">
              <div class="form-group">
                <label class="col-form-label" for="team-name">Team Name</label>
                <input type="text" class="form-control" id="team-name" name="team_name" v-model="team_name" placeholder="Team Name">
              </div>
            </div>
            <!--<div class="tiled inner-tile">-->
            <!--  <div class="form-group">-->
            <!--    <label for="team-logo">Team Logo</label>-->
            <!--    <input type="file" class="form-control-file" id="team-logo" name="team_logo" v-model="team_logo">-->
            <!--  </div>-->
            <!--</div>-->
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
                <b-form-checkbox-group  name="recruiting" v-model="recruiting_selected" :options="recruiting_options">
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
                <b-form-radio-group  name="competitiveness" v-model="competitive_selected" :options="competitive_options">
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
      team_name: '',
      team_logo: '',
      description: '',
      recruiting_selected: [],
      languages_selected: [],
      regions_selected: [],
      competitive_selected: '',
      recruiting_options: [
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
    onSubmit () {
      const data = {
        teamName: this.team_name,
        teamLogo: this.team_logo,
        description: this.description,
        regions: this.regions_selected,
        languages: this.languages_selected,
        comms: this.comms_selected,
        recruiting: this.recruiting_selected,
        competitiveness: this.competitive_selected,
        timetable: {
          row1: [1, 0, 0, 0, 0, 0, 0],
          row2: [1, 0, 0, 0, 0, 0, 0],
          row3: [1, 0, 0, 1, 0, 0, 0],
          row4: [1, 0, 0, 1, 0, 0, 0],
          row5: [1, 0, 0, 1, 0, 0, 0],
          row6: [1, 0, 0, 0, 0, 0, 0],
          row7: [0, 0, 0, 0, 0, 0, 0],
          row8: [0, 0, 0, 0, 0, 0, 0],
          row9: [0, 0, 0, 0, 0, 0, 0],
          row10: [0, 0, 1, 0, 0, 0, 0],
          row11: [0, 0, 1, 0, 0, 0, 0],
          row12: [0, 0, 1, 0, 0, 0, 0],
          row13: [0, 0, 0, 0, 0, 0, 0],
          row14: [0, 0, 0, 0, 0, 0, 0],
          row15: [0, 0, 0, 0, 0, 0, 0],
          row16: [0, 0, 0, 0, 0, 0, 0],
          row17: [0, 0, 0, 0, 0, 0, 0],
          row18: [0, 0, 0, 0, 0, 0, 0],
          row19: [0, 0, 0, 0, 0, 0, 0],
          row20: [0, 0, 0, 0, 0, 0, 0],
          row21: [0, 0, 0, 0, 0, 0, 0],
          row22: [0, 0, 0, 0, 0, 0, 0],
          row23: [0, 0, 0, 0, 0, 0, 0],
          row24: [0, 0, 0, 0, 0, 0, 0]
        }
      }
      console.log(data)
      this.$store.dispatch('createTeam', data)
    },
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

