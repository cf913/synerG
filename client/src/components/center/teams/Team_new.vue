<template>
  <div class="new-team text-left container tile gray-tile" id="team-new">
    <div class="container py-3 text-left">
      <h2 class="py-3 title">Create New Team</h2>
      <form>
        <h6 class="title">Team Name</h6>
        <input type="text" class="form-control" id="team-name" name="team_name" v-model="team_name">
        <!--<div class="tiled inner-tile">-->
        <!--  <div class="form-group">-->
        <!--    <label for="team-logo">Team Logo</label>-->
        <!--    <input type="file" class="form-control-file" id="team-logo" name="team_logo" v-model="team_logo">-->
        <!--  </div>-->
        <!--</div>-->
        <br>
        <h6 class="title">Description:</h6>
        <b-form-textarea class="description"
          v-model="description"
          :rows="3"
          :max-rows="6">
        </b-form-textarea>
        <br>
        <h6 class="title">Position You Are Playing:</h6>
        <b-form-radio-group  name="position" v-model="position_selected" :options="position_options"></b-form-radio-group>
        <h6 class="title">Recruiting:</h6>
        <b-form-checkbox-group  name="recruiting" v-model="recruiting_selected" :options="recruiting_options"></b-form-checkbox-group>
        <h6 class="title">Languages:</h6>
        <b-form-checkbox-group  name="languages" v-model="languages_selected" :options="languages_options"></b-form-checkbox-group>
        <h6 class="title">Regions:</h6>
        <b-form-checkbox-group  name="regions" v-model="regions_selected" :options="regions_options"></b-form-checkbox-group>
        <h6 class="title">Competitiveness:</h6>
        <b-form-radio-group  name="competitiveness" v-model="competitive_selected" :options="competitive_options"></b-form-radio-group>
        <h6 class="title">Method of Communication:</h6>
        <b-form-checkbox-group  name="comms" v-model="comms_selected" :options="comms_options"></b-form-checkbox-group>
        <br>
        <h6 class="title">Timetable</h6>
        <p>Indicate what time you are likely to be online or when team practices will occur</p>
        <table id="timetable">
		      <tr>
		      	<td></td>
		      	<td>Monday</td>
		      	<td>Tuesday</td>
		      	<td>Wednesday</td>
		      	<td>Thursday</td>
		      	<td>Friday</td>
		      	<td>Saturday</td>
		      	<td>Sunday</td>
		      </tr>
		    	<tr v-for="(time, index) in timetable" :key="index">
		    	  <td>{{ index | formatHour }}</td> 
		    	  <td v-for="(day, i) in time" :key="i" :class="{selected: day}">
		    	  	<button type="button" @click="toggleCell(index, i)">
                <i v-if="day" class="fa fa-minus fa-fw"></i>
                <i v-else class="fa fa-plus fa-fw"></i>
              </button>
		    	  </td>
		    	</tr>
		    </table>
		    <br>
        <div class="d-flex justify-content-end align-items-center">
          <b-button @click.prevent="onCancel()" variant="danger">Cancel</b-button>
          <b-button type="submit" @click.prevent="onSubmit()" variant="info">Save</b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    formatHour (value) {
      let time = value.split('').splice(3).join('')
      return `${time - 1}-${time}`
    }
  },
  data () {
    return {
      team_name: '',
      team_logo: '',
      description: '',
      recruiting_selected: [],
      languages_selected: [],
      regions_selected: [],
      competitive_selected: '',
      position_selected: '',
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
      ],
      position_options: [
        { text: 'Carry', value: 'Carry' },
        { text: 'Midlaner', value: 'Midlaner' },
        { text: 'Offlaner', value: 'Offlaner' },
        { text: 'Farming Support', value: 'Farming Support' },
        { text: 'Hard Support', value: 'Hard Support' }
      ],
      timetable: {
        row1: [0, 0, 0, 0, 0, 0, 0],
        row2: [0, 0, 0, 0, 0, 0, 0],
        row3: [0, 0, 0, 0, 0, 0, 0],
        row4: [0, 0, 0, 0, 0, 0, 0],
        row5: [0, 0, 0, 0, 0, 0, 0],
        row6: [0, 0, 0, 0, 0, 0, 0],
        row7: [0, 0, 0, 0, 0, 0, 0],
        row8: [0, 0, 0, 0, 0, 0, 0],
        row9: [0, 0, 0, 0, 0, 0, 0],
        row10: [0, 0, 0, 0, 0, 0, 0],
        row11: [0, 0, 0, 0, 0, 0, 0],
        row12: [0, 0, 0, 0, 0, 0, 0],
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
  },
  methods: {
    onSubmit () {
      const user = this.$store.getters.user
      const data = {
        teamName: this.team_name,
        teamLogo: this.team_logo,
        description: this.description,
        regions: this.regions_selected,
        languages: this.languages_selected,
        comms: this.comms_selected,
        recruiting: this.recruiting_selected,
        competitiveness: this.competitive_selected,
        timetable: this.timetable
      }
      const player = {
        player: user._id,
        position: this.position_selected
      }
      console.log(data)
      this.$store.dispatch('createTeam', {data, player})
    },
    onReset () {
      this.team_name = ''
      this.team_logo = ''
      this.description = ''
      this.recruiting_selected = []
      this.languages_selected = []
      this.regions_selected = []
      this.competitive_selected = ''
      this.position_selected = ''
    },
    onCancel () {
      this.$router.go(-1)
    },
    toggleCell (prop, index) {
      let state = this.timetable[prop][index]
      // using absolute values: 0 - 1 = 1 and 1 - 1 = 0 ggwp :)
      // splice replaces elem at index index by Math.abs(state - 1)
      this.timetable[prop].splice(index, 1, Math.abs(state - 1))
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

  #timetable {
    width: 100%;
  }
  
  th,td{
    margin: 0;
    text-align: center;
    border-collapse: collapse;
    outline: 1px solid #e3e3e3;
  }

  td{
    padding: 5px 10px;
  }
  
  td.selected{
    background-color: green;
  }

  th{
    background: #666;
    color: white;
    padding: 5px 10px;
  }

  #team-new {
    overflow-y: scroll;
    height: 92vh;
  }
</style>

