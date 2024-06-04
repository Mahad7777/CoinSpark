const Campaign = require('../models/camp_req')
const createRequests = async (req, res) => {
    try {
        const { name, campaignTitle, story, goal, endDate, imageUrl, walletAddress, useremail } = req.body;

        const existingCampaign = await Campaign.findOne({ useremail, status: 'pending' });
        if (existingCampaign) {
            return res.status(400).json({ err: "Your request already submitted and is pending approval!" });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ err: "Must attach supporting files for your case!" });
        }

        // Collect file paths
        const documents = req.files.map(file => file.path);

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
            documents
        });

        // Save the campaign to the database
        const savedCampaign = await newCampaign.save();

        // Respond with the saved campaign
        res.status(201).json({ savedCampaign, msg: "Request submitted to Admin!" });
    } catch (err) {
        console.error('Error creating campaign:', err);
        res.status(500).json({ error: 'An error occurred while creating the campaign' });
    }
};

const getRequests = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200).json(campaigns);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const getRequest_withID = async (req, res) => {
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
    const updateRequestStatus =  async (req, res) => {
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
    
            res.json({ message: 'Campaign status updated successfully! '});
        } catch (error) {
            console.error('Error updating campaign status:', error);
            res.status(500).json({ error: 'An error occurred while updating the campaign status' });
        }
    };

    const getRequest_withStatus = async (req, res) => {
        try {
          const { status } = req.params;
      
          if (!status) {
            return res.status(400).json({ error: "Please provide a valid status parameter." });
          }
      
          const filteredCampaigns = await Campaign.find({ status });
      
          if (filteredCampaigns.length === 0) {
            return res.status(404).json({ error: `No campaigns found with status ${status}` });
          }
      
          res.status(200).json(filteredCampaigns);
        } catch (error) {
          console.error("Error handling request:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      };

module.exports = {
    createRequests,
    getRequests,
    getRequest_withID,
    updateRequestStatus,
    getRequest_withStatus
}