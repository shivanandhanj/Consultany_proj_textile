const smallproduct = require("../models/dummy");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Setup Multer with Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "product_images", // Cloudinary folder name
    format: async (req, file) => "jpg", // Convert all images to JPG
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const upload = multer({ storage });

// Upload Product with Image
const addProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body;
    const image = await req.file ? req.file.path : null; // Get Cloudinary image URL
     console.log("addproduct:",image);
    const newProduct = new smallproduct({ name, category, price, images: image ? [image] : []  });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully!", newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Products (Including Image URLs)
const getProducts = async (req, res) => {
  try {
    const products = await smallproduct.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addProduct, getProducts, upload };
