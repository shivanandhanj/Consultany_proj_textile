const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dhccogyze",  // Replace with your Cloudinary Cloud Name
  api_key: "382516962163964",        // Replace with your Cloudinary API Key
  api_secret: "nfWoUkj3haZgx1D6PQQ6_2_iLGo",  // Replace with your Cloudinary API Secret
});

module.exports = cloudinary;