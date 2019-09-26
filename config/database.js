const mongoose = require('mongoose');
const config = require('./config');

module.exports = function () {

    mongoose.connect(config.dbConnection, { useNewUrlParser: true })
        .then(db => {
            console.log(`Database connected`)
        })
        .catch(err => {
            console.log(`Error in connecting database.`)

        })
}



