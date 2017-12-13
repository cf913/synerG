const mongoose = require('mongoose')

const Schema = mongoose.Schema

const HeroSchema = new Schema({
  hero_id: String,
  last_played: Number,
  games: Number,
  win: Number,
  with_games: Number,
  with_win: Number,
  against_games: Number,
  against_win: Number
})