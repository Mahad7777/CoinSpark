const express = require('express')
const app = express()
const db = require('./controllers/dbConnection')
const cors = require('cors')
const cookieParser = require('cookie-parser')

//setting up cors
const corsOptions = {
    credentials: true,
    origin: 'http://localhost:5173'
};
const corsMiddleware = cors(corsOptions);
app.use(corsMiddleware);

//setting up json
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
//setting up routes
app.use('/user', require('./routes/user'))
app.use('/campaigns', require('./routes/campaign_req'))

//setting up port
const port = 8000
app.listen(port,() => {console.log(`Server running on port ${port}`)}) 