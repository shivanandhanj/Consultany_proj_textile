
const Product=require("../models/product.model");
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
    console.log(req.body);
    const { name, category, subcategory,brand,description,price,discount_price, size,color,fabric,pattern,sleeve_length,fit,occasion,stock,images} = req.body;
     
    const newProduct = new Product({ name, category, subcategory,brand,description,price,discount_price,size,color,fabric,pattern,sleeve_length,fit,occasion,stock, images  });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully!", newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const addimage = async (req, res) => {
  try {
    const images = req.files ? req.files.map((file) => file.path) : [];
    res.status(200).json({ images }); // Return image URLs
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// Get All Products (Including Image URLs)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addProduct, getProducts,addimage, upload };
