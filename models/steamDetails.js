const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SteamSchema = new Schema({
  steamid: String,
  communityvisibilitystate: Number,
  profilestate: Number,
  personaname: String,
  lastlogoff: Number,
  profileurl: String,
  avatar: String,
  avatarmedium: String,
  avatarfull: String,
  personastate: Number,
  realname: String,
  primaryclanid: String,
  timecreated: Number,
  personastateflags: Number,
  loccountrycode: String,
  locstatecode: String
})