<template>
  <div class="team-edit text-left container tile gray-tile" id="team-edit">
    <div class="container py-3 text-left">
      <h2 class="py-3 title">{{team.teamName}}</h2>
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
        <table id="timetable">
		    	<tr>
		    		<td class="table-header title"></td>
		    		<th class="table-header title">Monday</th>
		    		<th class="table-header title">Tuesday</th>
		    		<th class="table-header title">Wednesday</th>
		    		<th class="table-header title">Thursday</th>
		    		<th class="table-header title">Friday</th>
		    		<th class="table-header title">Saturday</th>
		    		<th class="table-header title">Sunday</th>
		    	</tr>
		    	<!--<tr>-->
		    	<!--	<td>12am</td>-->
		    	<!--	<td :class="{selected: monday[0] === 1}" class="scale-up">-->
		    	<!--		<button type="button" v-if="monday[0] === 1" @click="monday[0] -= 1"><i class="fa fa-minus fa-fw"></i></button>-->
		    	<!--		<button type="button" v-else @click="monday[0] += 1"><i class="fa fa-plus fa-fw"></i></button>-->
		    	<!--	</td>-->
		    	<!--	<td :class="{selected: tuesday[0] === 1}" class="scale-up"><i class="fa fa-minus fa-fw" v-if="tuesday[0] === 1"></i><i class="fa fa-plus fa-fw" v-else></i></td>-->
		    	<!--	<td :class="{selected: wednesday[0] === 1}" class="scale-up"><i class="fa fa-minus fa-fw" v-if="wednesday[0] === 1"></i><i class="fa fa-plus fa-fw" v-else></i></td>-->
		    	<!--	<td :class="{selected: thursday[0] === 1}" class="scale-up"><i class="fa fa-minus fa-fw" v-if="thursday[0] === 1"></i><i class="fa fa-plus fa-fw" v-else></i></td>-->
		    	<!--	<td :class="{selected: friday[0] === 1}" class="scale-up"><i class="fa fa-minus fa-fw" v-if="friday[0] === 1"></i><i class="fa fa-plus fa-fw" v-else></i></td>-->
		    	<!--	<td :class="{selected: saturday[0] === 1}" class="scale-up"><i class="fa fa-minus fa-fw" v-if="saturday[0] === 1"></i><i class="fa fa-plus fa-fw" v-else></i></td>-->
		    	<!--	<td :class="{selected: sunday[0] === 1}" class="scale-up"><i class="fa fa-minus fa-fw" v-if="sunday[0] === 1"></i><i class="fa fa-plus fa-fw" v-else></i></td>-->
		    	<!--</tr>-->
          <!-- you were updating time[index] instead of the values in timetable -->
		    	<tr v-for="(time, index) in timetable" :key="index">
            <!-- for display: added a filter (formatHour) to format index. index is the key of the object timetable (row1, row2,...). 
                 formatHour turns 'row6' into '5-6' -->
		    	  <td class="table-header title">{{ index | formatHour }}</td> 
            <!-- For loop for table cells -->
            <!-- day is an elem of time, where time is an array of length 6. when day == 1 (same as day == true) add class selected -->
		    	  <td v-for="(day, i) in time" :key="i" :class="{selected: day}">
              <!-- on click toggle day value 0 or 1 -->
		    	  	<button type="button" class="timetable-button" @click="toggleCell(index, i)">
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
      if (time < 2) {
        return `12am - 1am`
      } else if (time > 1 && time < 12) {
        return `${time - 1}am - ${time}am`
      } else if (time > 11 && time < 13) {
        return `${time - 1}am - ${time}pm`
      } else if (time > 12 && time < 14) {
        return `12pm - 1pm`
      } else if (time > 23 && time < 25) {
        return `11pm - 12am`
      } else {
        return `${time - 13}pm - ${time - 12}pm`
      }
    }
  },
  data () {
    return {
      team_name: '',
      description: '',
      regions_selected: [], // Must be an array reference!
      languages_selected: [],
      comms_selected: [],
      recruiting_selected: [],
      competitive_selected: '',
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
      recruiting_options: [
        { text: 'Carry', value: 'Carry' },
        { text: 'Midlaner', value: 'Midlaner' },
        { text: 'Offlaner', value: 'Offlaner' },
        { text: 'Farming Support', value: 'Farming Support' },
        { text: 'Hard Support', value: 'Hard Support' }
      ],
      competitive_options: [
        { text: 'Casual Unranked', value: 'Casual Unranked' },
        { text: 'Casual Ranked', value: 'Casual Ranked' },
        { text: 'Semi-Competitive Ranked', value: 'Semi-Competitive Ranked' },
        { text: 'Competitive Ranked', value: 'Competitive Ranked' },
        { text: 'Tournaments', value: 'Tournaments' }
      ],
      timetable: {}
    }
  },
  computed: {
    team () {
      return this.$store.getters.team
    }
    // timetable () {
    //   return this.timetable_cache
    // }

  },
  methods: {
    onSubmit () {
      const data = {
        teamName: this.team_name,
        description: this.description,
        regions: this.regions_selected,
        languages: this.languages_selected,
        comms: this.comms_selected,
        recruiting: this.recruiting_selected,
        competitiveness: this.competitive_selected,
        timetable: this.timetable
      }
      this.$store.dispatch('editTeam', {data, id: this.$route.params.id})
    },
    onCancel () {
      this.$router.go(-1)
    },
    // toggleCell takes two arguments
    // prop: the key i.e. row1, row2...
    // index: the index of the cell of the array corresponding to key prop
    toggleCell (prop, index) {
      let state = this.timetable[prop][index]
      // using absolute values: 0 - 1 = 1 and 1 - 1 = 0 ggwp :)
      // splice replaces elem at index index by Math.abs(state - 1)
      this.timetable[prop].splice(index, 1, Math.abs(state - 1))
    }
  },
  activated () {
    const team = this.$store.getters.team
    this.team_name = team.teamName
    this.description = team.description
    this.regions_selected = team.regions
    this.languages_selected = team.languages
    this.comms_selected = team.comms
    this.recruiting_selected = team.recruiting
    this.competitive_selected = team.competitiveness
    this.timetable = team.timetable
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

  .table-header {
    background-color: #333;
  }

  th,td{
    margin: 0;
    text-align: center;
    border-collapse: collapse;
    outline: 1px solid #e3e3e3;
  }

  td{
    padding: 5px;
    font-size: 13px;
  }
  
  td.selected{
    background-color: green;
  }

  th{
    padding: 5px;
  }

  /*td:hover{*/
  /*  cursor: pointer;*/
  /*  background: #666;*/
  /*  color: white;*/
  /*}*/
  
  td i{
    visibility:hidden;
  }
  td:hover i {
    visibility:visible;
  }

  button.timetable-button {
    background-color: transparent;
    border-color: transparent;
  }
  
  /*.scale-up i{*/
  /*  font-size: 1.8em;*/
  /*  cursor: pointer;*/
  /*  transform: scale(1);*/
  /*  transition: 0.3s;*/
  /*}*/

  /*.scale-up:hover i{*/
  /*  transform: scale(1.3);*/
  /*  transition: 0.1s;*/
  /*}*/

  /*.scale-up:active i{*/
  /*  transform: scale(1.1); */
  /*}*/

  /*.scale-up:focus i{*/
  /*  transform: scale(1.1); */
  /*}*/

  #team-edit {
    overflow-y: scroll;
    height: 86.4vh;
  }
</style>
