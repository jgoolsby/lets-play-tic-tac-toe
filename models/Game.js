const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const gameSchemas = new Schema({
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
    return mongoose.model('game', gameSchemas, collection)
}