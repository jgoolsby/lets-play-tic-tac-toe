const mongoDB = require('./util/mongo');

let Game = require('./models/Game')('Games')

function generateGameCode() {
    return Math.random().toString().substr(2, 5)
}

function createGame(gameCode, gameCreator) {

    let newGame = new Game({ gameID: gameCode, createdBy: gameCreator, opponent: '', timeCreated: Date.now(), winner: '', active: true })

    // Save Game to Database
    newGame.save((error) => {

        if (error) {
            return console.log(`error has occurred: ${error}`);
        }

    })
}

module.exports = function (socket, io) {
    let gameCreator = socket.id
    let gameCode
    // if game was created
    if (socket.handshake.query.created === 'true') {

        // Create GameCode
        gameCode = generateGameCode()

        socket.join(gameCode)

        // Send Game Code to Creator
        io.to(gameCreator).emit('gameCode', { gameCode })

        // Create Game in Database
        createGame(gameCode, gameCreator)



    } else {
        gameCode = socket.handshake.query.gameCode

        io.to(gameCreator).emit('gameCode', { gameCode })

        socket.join(gameCode)


    }

}