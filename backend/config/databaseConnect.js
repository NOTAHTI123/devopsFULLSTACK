const mongoose = require('mongoose');

const ConnectDB = async () => {
    await mongoose.connect(process.env.DB_URL, {
        dbName: 'FMOVIES',
    })
    .then((resp) => console.log(`DB CONNECTED`))
    .catch((err) => console.log(`Error Connecting to the DB, log: ${err}`))
}

module.exports = ConnectDB;