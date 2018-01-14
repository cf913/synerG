const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema


const TeamSchema = new Schema({
  teamName: String,
  teamLogo: String,
  description: String,
  recruiting: [String],
  languages: [String],
  regions: [String],
  comms: [String],
  competitiveness: String
})



TeamSchema.plugin(uniqueValidator);

// PlayerSchema.pre('save', function (next) {
//   const user = this

//   if (this.isModified('password') || this.isNew) {
//     bcrypt.genSalt(10, (error, salt) => {
//       if (error) return next(error)
//       bcrypt.hash(user.password, salt, (error, hash) => {
//         if (error) return next(error)
//         user.password = hash
//         next()
//       })
//     })
//   } else {
//     return next()
//   }
// })

// PlayerSchema.methods.comparePassword = function (password, callback) {
//   bcrypt.compare(password, this.password, (error, matches) => {
//     if (error) return callback(error)
//     callback(null, matches)
//   });
// };

const Team = mongoose.model('team', TeamSchema)

module.exports = Team