const express = require("express")
const { createCampaign, getCampaigns } = require("../controllers/campaignController")
const campaign = express.Router()

campaign.post('/',createCampaign)
campaign.get('/', getCampaigns)

module.exports = campaign