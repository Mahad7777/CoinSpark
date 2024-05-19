const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Database connected! ")
}).catch((err) => {
    console.log("Database unable to connect!!", err)
});
