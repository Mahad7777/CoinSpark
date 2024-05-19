const express = require('express')
const user = express.Router()
const {userSignup, userLogin, getUser} = require('../controllers/userController')
const { AuthenticateToken } = require('../controllers/tokenController')

user.post('/signup',userSignup)
user.post('/login', userLogin)
user.get('/getuser', AuthenticateToken, getUser)


module.exports = user