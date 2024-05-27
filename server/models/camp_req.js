const mongoose = require('mongoose');

// Define the schema
const CampaignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    useremail: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    campaignTitle: {
        type: String,
        required: true,
        trim: true
    },
    story: {
        type: String,
        required: true,
        trim: true
    },
    goal: {
        type: Number,
        required: true,
        min: 0
    },
    endDate: {
        type: Date,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true
    },
    walletAddress: {
        type: String,
        required: true,
        trim: true
    },
    documents:{
        type: [String],
        required: true,
        default: []
    },
    status:{
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }
}, {
    timestamps: true // This will add createdAt and updatedAt timestamps automatically
});

// Create the model
const Campaign = mongoose.model('Campaign', CampaignSchema);

module.exports = Campaign;
