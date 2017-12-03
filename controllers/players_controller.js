const Player = require('@models/player')

module.exports = {

    getPlayers(req, res, next) {
        let query = buildQuery(req.body)
        Player.find(query).limit(30)
        .then((players) => {
            res.send(players)
        })
        .catch(err => {
            console.log(err)
        })
    },

    getPlayer(req, res, next) {
        Player.findOne({steamId: req.params.id})
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
}

function buildQuery(body) {
    let query = {}
    if (Object.keys(body).length === 0) return query
    // build query
    if (body.regions.length > 0) {
        query['regions'] = {$in: body.regions}
    }
    if (body.languages.length > 0) {
        query['languages'] = {$in: body.languages}
    }
    if (body.comms.length > 0) {
        query['comms'] = {$in: body.comms}
    }
    if (body.positions.length > 0) {
        query['positions'] = {$in: body.positions}
    }
    if (body.mmr.length > 0) {
        if (body.mmr.length == 1) {
            query['mmr.mmr_estimate'] = { $gte: body.mmr[0].min, $lte: body.mmr[0].max}
        } else {
            query['$or'] = []
            for (let i = 0; i < body.mmr.length; i++) {
                query['$or'].push({'mmr.mmr_estimate': {$gte: body.mmr[i].min, $lte: body.mmr[i].max}})
            }
        }
    }
    return query
}