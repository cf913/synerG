const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TimetableSchema = new Schema({
  monday: [0,0,0,0,0,0,0],
  tuesday: [0,0,0,0,0,0,0],
  wednesday: [0,0,0,0,0,0,0],
  thursday: [0,0,0,0,0,0,0],
  friday: [0,0,0,0,0,0,0],
  saturday: [0,0,0,0,0,0,0],
  sunday: [0,0,0,0,0,0,0]
})