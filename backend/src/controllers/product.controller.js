const product=require('../models/product.model')
const Review = require("../models/review.model");
const getProduct=async(req,res)=>{
    try{
        const products=await product.find();
        res.json(products);
        console.log("cmame ro frontend")
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


const single=async (req, res) => {
    try {
        console.log(req.params.id)
        const Product = await product.findById(req.params.id).populate("reviews");
        if (!Product) return res.status(404).json({ message: "Product not found" });
        res.json(Product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports={getProduct,single}