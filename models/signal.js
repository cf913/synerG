const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SignalSchema = new Schema({
  position: String,
  language: String,
  region: String,
  competitiveness: String,
  description: String,
  isPlayer: Boolean,
  player: {type: Schema.Types.ObjectId, ref: 'Player'},
  team: {type: Schema.Types.ObjectId, ref: 'Team'}
}, {
	timestamps: true
})

const Signal = mongoose.model('Signal', SignalSchema)

module.exports = Signal