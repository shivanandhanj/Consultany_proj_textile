const cloudinary = require("cloudinary").v2;
require('dotenv').config();

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,  // Replace with your Cloudinary Cloud Name
  api_key: process.env.API_KEY,       // Replace with your Cloudinary API Key
  api_secret: process.env.API_SECRET, // Replace with your Cloudinary API Secret
});

module.exports = cloudinary;