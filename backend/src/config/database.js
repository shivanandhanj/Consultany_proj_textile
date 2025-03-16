const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const MONGODB_URI = process.env.MONGODB_URI;


mongoose.connect(MONGODB_URI, {
 
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

module.exports = mongoose; // Export mongoose instance
