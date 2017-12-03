const Player = require('../../models/player')

module.exports = {

    getPlayers(req, res, next) {
        Player.find({}).limit(30)
        .then((players) => {
            res.send(players)
        })
    },


    // create(req, res, next) {
    //     const playerProps = req.body

    //     Player.create(playerProps)
    //     .then(player => {
    //         res.send(player)
    //     })
    //     .catch(next)
    // },

    getPlayer(req, res, next) {
        Player.findById(req.params.id)
        .then(player => {
            res.send(player)
        })
    },

    editPlayer(req, res, next) {
        Player.findOneAndUpdate({ steamId: req.params.id }, { $set: req.body }, { new: true })
        .then(player => {
            res.send(player)
        })
        .catch(err => {
            send(err)
        })
    },

//   updatePlayer(req, res, next) {
//     Player.findByIdAndUpdate(req.params.id, req.body)
//       .then(() => Player.findById(req.params.id))
//       .then(player => res.render('player', {player: player}))
//       .catch(next)
//   },

//   delete(req, res, next) {
//   }

}