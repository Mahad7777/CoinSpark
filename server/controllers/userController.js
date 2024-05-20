const User = require('../models/user')
const jwt = require('jsonwebtoken');
const { GenerateToken } = require('./tokenController');

const userSignup = async (req,res) => { 
    const {name,email,password} = req.body
    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ err: 'User already exists' });
        }
    
        // Create a new user instance
        user = new User({
            name,
            email,
            password,
        });
    
        // Save the user to the database
        await user.save();
    
        res.status(201).json({ msg: 'User registered successfully' });
        }catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ err: 'User not found' });
        }

        // Check if the password matches
        if (user.password !== password) {
            return res.status(400).json({ err: 'Invalid credentials' });
        }

        // Generate JWT token
        const payload = {
            id: user.id,
            username: user.name
        }
        const token = await GenerateToken(payload);
        res.json({user, token: token, msg: "Successfully LoggedIn !"})

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ err: err.message });
    }
};


const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        res.json({ userData: user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    userSignup,
    userLogin,
    getUser
}