const Campaign = require('../models/camp_req')
const createCampaign= async (req,res)=>{
    try {
        const { name, campaignTitle, story, goal, endDate, imageUrl, walletAddress, useremail, status} = req.body;

        const existingCampaign = await Campaign.findOne({ useremail, status: 'pending' });
        if (existingCampaign) {
            return res.status(400).json({ err: "Your request already submitted and is pending approval!" });
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
            walletAddress,
            status: "pending"
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

const getCampaign_withID = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        res.json(campaign);
        } catch (error) {
        console.error('Error fetching campaign:', error);
        res.status(500).json({ message: 'Server error' });
        }
    }

  // PATCH endpoint to update campaign status
    const updateCampaignStatus =  async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;
    
        try {
            // Find the campaign by ID
            const campaign = await Campaign.findById(id);
    
            if (!campaign) {
                return res.status(404).json({ error: 'Campaign not found' });
            }
    
            // Update the status of the campaign
            campaign.status = status;
            const updatedCampaign = await campaign.save();
    
            res.json({ message: 'Campaign rejected successfully'});
        } catch (error) {
            console.error('Error updating campaign status:', error);
            res.status(500).json({ error: 'An error occurred while updating the campaign status' });
        }
    };

module.exports = {
    createCampaign,
    getCampaigns,
    getCampaign_withID,
    updateCampaignStatus
}