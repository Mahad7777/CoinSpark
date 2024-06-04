const express = require('express')
const app = express()
const db = require('./controllers/dbConnection')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')

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
app.use('/transactions', require('./routes/transactions'))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use(express.static("../client/dist"))
// app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(__dirname,"client","dist","index.html"))
// })

//setting up port
const port = 8000
app.listen(port,() => {console.log(`Server running on port ${port}`)}) 