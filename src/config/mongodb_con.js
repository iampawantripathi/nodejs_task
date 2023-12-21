const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const URL = dotenv.parsed.DB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true
}).then(() => {
    console.log("Mongodb connection has been established successfully!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

