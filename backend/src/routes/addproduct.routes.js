const express = require("express");
const router = express.Router();
const productController = require("../controllers/addproduct.controller");

// Route to Upload Product Image & Save Product
router.post("/add",  productController.addProduct);
router.post("/add/images",productController.upload.array("images", 5),productController.addimage)
module.exports=router