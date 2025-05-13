const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password
    });
    console.log(user.email);
    await user.save();
   

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "a3f4b8c9e5d6a7b2c1d4e9f8g7h6i5j4k3l2m1n0o9p8q7r6s5t4u3v2w1x0y9z8",
      { expiresIn: '24h' }
    );
   
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        
      }
      
    });
   
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};   

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'a3f4b8c9e5d6a7b2c1d4e9f8g7h6i5j4k3l2m1n0o9p8q7r6s5t4u3v2w1x0y9z8',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

exports.name=async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name");
    if (!user) return res.status(404).json({ message: "User not found" });
     console.log(user.name);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
