const jwt = require('jsonwebtoken');
const User = require('../models/user');


const GenerateToken = (payload, res) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error("Error generating token:", err);
            reject(err);
            } else {
                res.cookie('token', token);
                resolve(token);
            }
        });
    });
};
const AuthenticateToken = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "Token not found!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // Token verification failed
            return res.status(401).json({ message: "Invalid token!" });
        }
        // Token is valid, attach user to request and proceed
        req.user = user;
        // res.json({user})
        next();
    });
};


module.exports = {
    AuthenticateToken,
    GenerateToken
}
