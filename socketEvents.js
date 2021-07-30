const mongoDB = require('./util/mongo');

function generateGameCode() {
    return Math.random().toString().substr(2, 5)
}

module.exports = function (socket, io) {

    let gameCreator = socket.id;

    if (Boolean(socket.handshake.query.created)) {
        let gameCode = generateGameCode()

        io.to(gameCreator).emit('gameCode', { gameCode })

        let Game = require('./models/Game')('Games')

        let newGame = new Game({ gameID: gameCode, createdBy: '11', opponent: '22', timeCreated: Date.now(), winner: '', active: true })

        // Save Game to Database
        newGame.save((error) => {
            if (error) {
                return console.log(`error has occurred: ${error}`);
            }
            // console.log('Document is successfully saved.');
        });


    }
    // if created == true, function for generating game code, return to creation and then storing <-------
    // socket.on()



}