const mongoose = require('mongoose');
try {
    mongoose.connect('mongodb://127.0.0.1:27017/tic-tac-toe', { useNewUrlParser: true, useUnifiedTopology: true });
} catch (e) {
    console.log(e, 'error');
}
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection error:'));
module.exports = db;
