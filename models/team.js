const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const TimetableSchema = require('./schemas/timetable')
const Schema = mongoose.Schema
// const PlayerSchema = require('./schemas/player')


const TeamSchema = new Schema({
  teamName: String,
  teamLogo: String,
  description: String,
  recruiting: [String],
  languages: [String],
  regions: [String],
  comms: [String],
  competitiveness: String,
  timetable: TimetableSchema,
  teamMembers: [{type: Schema.Types.ObjectId, ref: 'Player'}],
  // teamAdmins: [PlayerSchema]
  teamAdmins: [{type: Schema.Types.ObjectId, ref: 'Player'}],
  pending: [{type: Schema.Types.ObjectId, ref: 'Player'}]
})



TeamSchema.plugin(uniqueValidator);

const Team = mongoose.model('Team', TeamSchema)

module.exports = Team