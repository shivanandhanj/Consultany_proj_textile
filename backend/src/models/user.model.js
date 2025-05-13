const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },



shippingAddress: {
 
  address: String,
  city: String,
  postalCode: String,
  State: String,
 
},
  MobileNumber:{
    type:String,
    unique: true,
  },


  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: { type: String, enum: ['Customer', 'Wholesale Buyer', 'Designer', 'Retailer'], default: 'Customer' },




  profileImage: { type: String, default: '/default-profile.jpg' },
  
  // Textile E-commerce Specific
  favoriteCategories: [{ type: String }],
  
  // Reference to existing Orders schema

  // User Preferences
  preferences: {
    notifications: { type: Boolean, default: true },
    newsletter: { type: Boolean, default: true },
    fabricAlerts: { type: Boolean, default: false },
    currency: { type: String, enum: ['USD', 'EUR', 'GBP', 'JPY'], default: 'USD' },
    measurementUnit: { type: String, enum: ['Inches', 'Centimeters', 'Yards/Meters'], default: 'Inches' }
  },
  
  // Body Measurements
  measurements: {
    bust: { type: String },
    waist: { type: String },
    hips: { type: String }
  },
  
  // Saved Pattern Sizes
  patternSizes: [{
    name: { type: String },
    size: { type: String },
    standard: { type: String }
  }],
  lastLogin: { type: Date },
  isActive: { type: Boolean, default: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;