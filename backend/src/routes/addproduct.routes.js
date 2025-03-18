const express = require("express");
const router = express.Router();
const productController = require("../controllers/addproduct.controller");
const orderController =require("../controllers/order.controller");

// Route to Upload Product Image & Save Product
router.post("/add",  productController.addProduct);
router.post("/add/images",productController.upload.array("images", 5),productController.addimage)
router.get("/update/:id",productController.updateProducts);
router.put("/update/:id",productController.updateProudctsadd);
router.get("/orders",orderController.getAllOrders);
module.exports=router