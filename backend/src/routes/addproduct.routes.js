const express = require("express");
const router = express.Router();
const productController = require("../controllers/addproduct.controller");

// Route to Upload Product Image & Save Product
router.post("/add", productController.upload.single("image"), productController.addProduct);

module.exports=router