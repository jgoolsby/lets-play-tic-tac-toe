
const mongoDB = require('../../util/mongo')

var mongoose = require('mongoose')

let Game = mongoose.model('game')

function getByCode(code, res) {

    return new Promise((resolve, reject) => {

        Game.findOne({ gameID: code }, (err, oneBook) => {
            if (err) console.error(err)
            resolve(oneBook)
            return oneBook
        });

    }).catch(e => console.log(e))

}

export default async (req, res) => {

    const { method } = req

    let code = req.body.code

    switch (method) {
        case 'GET':
            break
        case 'POST':
            res.send(await getByCode(code, res))
            break
        case 'UPDATE':
            break;
        case 'DELETE':
            break;
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
            res.end()
    }

}
