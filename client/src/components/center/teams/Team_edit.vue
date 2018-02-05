<template>
  <div class="new-team text-left container tile gray-tile tile-shadow">
    <div class="">
      <div class="container py-3 text-left">
        <h2 class="py-3">{{team.teamName}}</h2>
          <form>
            <div class="tiled inner-tile">
              <div class="form-group">
                <label class="col-form-label" for="team-name">Team Name</label>
                <input type="text" class="form-control" id="team-name" name="team_name" v-model="team_name">
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
            <div class="tiled inner-tile">
              <p>Timetable</p>
              <p>{{timetable}}</p>
              <p>{{team.timetable}}</p>
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
		          	  <td>{{ index | formatHour }}</td> 
                  <!-- For loop for table cells -->
                  <!-- day is an elem of time, where time is an array of length 6. when day == 1 (same as day == true) add class selected -->
		          	  <td v-for="(day, i) in time" :key="i" :class="{selected: day}">
                    <!-- on click toggle day value 0 or 1 -->
		          	  	<button type="button" @click="toggleCell(index, i)">
                      <i v-if="day" class="fa fa-minus fa-fw"></i>
                      <i v-else class="fa fa-plus fa-fw"></i>
                    </button>
		          	  </td>
		          	</tr>
		          </table>
		        </div>
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
  filters: {
    formatHour (value) {
      let time = value.split('').splice(3).join('')
      return `${time - 1}-${time}`
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
        competitiveness: this.competitive_selected
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
</style>
