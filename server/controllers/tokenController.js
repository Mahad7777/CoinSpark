const jwt = require('jsonwebtoken');
const User = require('../models/user');


const GenerateToken = (payload) => { 
    try {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' },(err,token)=>{
            if(err) throw err
            res.cookie('token',token)
        });
    } catch (err) {
        console.error("Error generating token:", err);
        throw err;
    }
};
const AuthenticateToken = (req, res, next) => {
    const {token} = req.cookies 

    if (!token) {
        return res.status(401).json({ message: "Token not found!" });
    }
    jwt.verify(token,process.env.JWT_SECRET,{},(err, user)=>{
        if (err) throw err
        res.json(user)
    })
    next()
};

module.exports = {
    AuthenticateToken,
    GenerateToken
}
