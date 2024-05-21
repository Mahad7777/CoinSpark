const express = require("express")
const { createCampaign, getCampaigns, getCampaign_withID } = require("../controllers/campaignController")
const campaign = express.Router()

campaign.post('/',createCampaign)
campaign.get('/', getCampaigns)
campaign.get('/:id', getCampaign_withID)

module.exports = campaign