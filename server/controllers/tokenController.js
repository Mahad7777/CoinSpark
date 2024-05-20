const jwt = require('jsonwebtoken');
const User = require('../models/user');


const GenerateToken = (payload, res) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error("Error generating token:", err);
                reject(err);
            } else {
                // Set the token in a cookie
                res.cookie('token',token); // maxAge is in milliseconds (1 hour)
                resolve(token);
            }
        });
    });
};


const AuthenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Retrieve the 'token' cookie

    if (!token) {
        return res.status(401).json({ message: "Token not found!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token!" });
        }
        req.user = user;
        next();
    });
};




module.exports = {
    AuthenticateToken,
    GenerateToken
}
