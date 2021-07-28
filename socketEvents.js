function generateGameCode() {
    return Math.random().toString().substr(2, 5)
}

module.exports = function (socket, io) {

    let gameCreator = socket.id;

    if (Boolean(socket.handshake.query.created)) {
        let gameCode = generateGameCode()

        io.to(gameCreator).emit('gameCode', { gameCode })

    }
    // if created == true, function for generating game code, return to creation and then storing <-------
    // socket.on()



}