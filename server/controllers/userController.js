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
        jwt.sign(payload,process.env.JWT_SECRET, {expiresIn: '1h'},(err,token)=>{
            if(err) throw err
            res.cookie('token',token).json({user})
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ err: err.message });
    }
};


const getUser = async (req, res) => {
    try {
        // Assuming you have middleware for authentication to get the user from the request
        const user = req.user;
        const userid = user.id
        const userbyid = await User.findById(userid)
        // You may customize the data you want to return here
        // const userbyid = {
        //     id: user.id,
        //     name: user.name,
        //     email: user.email,
        //     isAdmin: user.isadmin // Assuming isAdmin is a field in your user schema
        // };
        res.json({userbyid});
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    userSignup,
    userLogin,
    getUser
}