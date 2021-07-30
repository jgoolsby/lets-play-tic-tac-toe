const mongoose = require('mongoose')

const gameSchemas = mongoose.Schema({
    gameID: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    opponent: {
        type: String,
        default: ''
    },
    timeCreated: {
        type: Date,
        default: Date.now
    },
    winner: {
        type: String,
        default: ''
    },
    active: {
        type: Boolean,
        default: true
    }
})

const Game = module.exports = function (collection) {
    console.log(collection, ' is tcollections ')
    return mongoose.model('game', gameSchemas, collection)
}