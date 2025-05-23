// controllers/userController.js
const User = require('../models/user.model'); // Adjust path as needed
const Order=require('../models/order.model');
// Create User
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate({
        path: 'orders',
        populate: {
          path: 'items.productId', // Populate each product in the items array
          model: 'Product'
        }
      });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getOrdersByUserId = async (req, res) => {
  const { userId } = req.params; // assuming route is /api/orders/user/:userId

  try {
    const result = await Order.find({ userId })
      .populate("userId", "name email")
      .populate("items.productId", "name price images")
      .exec();

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getShipping=async(req,res)=>{
  try{
     const user = await User.findById(req.params.id).select('name shippingAddress MobileNumber');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const details = {
      fullName: user.name,
      address: user.shippingAddress.address,
      city: user.shippingAddress.city,
      postalCode: user.shippingAddress.postalCode,
      phone: user.MobileNumber,
      country: 'India', // default/fallback if not stored
    };

    res.status(200).json(details);
  }catch(error){
    res.status(500).json({ error: error.message });
  }
}


// Read single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
