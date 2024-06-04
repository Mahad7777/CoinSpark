const express = require("express")
const { createRequests, getRequests, getRequest_withID, updateRequestStatus, getRequest_withStatus } = require("../controllers/campaignController")
const campaign = express.Router()
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/'); // Directory to store uploaded files
    },
    filename: function (req, file, cb) {
        console.log('Original filename:', file.originalname);
        // Remove special characters and spaces from the filename
        const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
        console.log('Sanitized filename:', sanitizedFilename);
        cb(null, Date.now() + '-' + sanitizedFilename); // Append timestamp to avoid filename conflicts
    }
});
const upload = multer({ storage: storage });
const uploadFields = upload.array('files', 10); // Assuming 'documents' is the field name and allowing up to 10 files

campaign.post('/',uploadFields,createRequests)
campaign.get('/', getRequests)
campaign.get('/:id', getRequest_withID)
campaign.get('/status/:status', getRequest_withStatus)
campaign.patch('/:id', updateRequestStatus)

module.exports = campaign