const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const TimetableSchema = require('./schemas/timetable')
const TeamMembersSchema = require('./schemas/teamMembers')
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
  teamAdmins: [TeamMembersSchema],
  teamMembers: [TeamMembersSchema],
  pending: [TeamMembersSchema]
})



TeamSchema.plugin(uniqueValidator);

const Team = mongoose.model('Team', TeamSchema)

module.exports = Team