const Campaign = require('../models/camp_req')
const createCampaign= async (req,res)=>{
    try {
        const { name, campaignTitle, story, goal, endDate, imageUrl, walletAddress, useremail } = req.body;
        
        const emailexists = await Campaign.findOne({useremail})
        if (emailexists){
            return res.status(400).json({err: "Your request already submitted!! "})
        }

        // Create a new campaign
        const newCampaign = new Campaign({
            name,
            useremail,
            campaignTitle,
            story,
            goal,
            endDate,
            imageUrl,
            walletAddress
        });

        // Save the campaign to the database
        const savedCampaign = await newCampaign.save();

        // Respond with the saved campaign
        res.status(201).json({savedCampaign, msg: "Request submitted to Admin!"});
    } catch (err) {
        console.error('Error creating campaign:', err);
        res.status(500).json({ error: 'An error occurred while creating the campaign' });
    }
}

const getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200).json(campaigns);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

module.exports = {
    createCampaign,
    getCampaigns
}