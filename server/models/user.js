const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');


// Define the schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    isadmin:{
        type: Boolean,
        default: false
    }
},{
  timestamps: true,
});

// Hash the password before saving
// userSchema.pre('save', async function (next) {
//   if (this.isModified('password') || this.isNew) {
//     try {
//       const salt = await bcrypt.genSalt(10);
//       this.password = await bcrypt.hash(this.password, salt);
//       next();
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     next();
//   }
// });

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
