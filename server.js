// process.env.NODE_ENV = 'production';
process.env.NODE_ENV = 'development';
const app = require('express')();

const next = require('next');

const http = require('http')

const dev = process.env.NEXT_PUBLIC_APP_ENV !== 'production';

const nextApp = next({ dev });

const nextHandler = nextApp.getRequestHandler();

let port = 3104;

var socketEvents = require('./socketEvents');

const secureServer = http.createServer({
    // key: fse.readFileSync("/home/jgoolsby/SSR/jacksonvillians/ssl/privkey.pem"),
    // cert: fse.readFileSync("/home/jgoolsby/SSR/jacksonvillians/ssl/fullchain.pem")
}, app);

const io = require('socket.io')(secureServer)

io.on('connection', (socket) => {

    socketEvents(socket, io)

})

nextApp.prepare().then(() => {

    app.get('*', (req, res) => {
        return nextHandler(req, res);
    });

    app.post('*', (req, res) => {
        return nextHandler(req, res)
    })

    secureServer.listen(port, (err) => {
        if (err) throw err;

        console.log(`Server listening of port ${port}`);
    });

})
