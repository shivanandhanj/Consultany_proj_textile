const Review = require("../models/review.model");
const express = require("express");
const router = express.Router();
const mongoose= require('mongoose');
const Product = require("../models/product.model");

// Create a new review
const review = async (req, res) => {
    try {
        let { user, rating, comment } = req.body;
        const { productId } = req.params;

        console.log("Received user ID:", user);
        console.log("Received product ID:", productId);

        // Validate product existence
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Convert user to ObjectId
        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }
        user = new mongoose.Types.ObjectId(user);

        // Create and save the new review
        const newReview = new Review({ product: productId, user, rating, comment });
        await newReview.save();
        const populatedReview = await Review.findById(newReview._id).populate("user", "name");
        // Add review to the product's reviews array
        product.reviews.push(newReview._id);
        await product.save();

        res.status(201).json({ message: "Review added successfully", review: populatedReview });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = {review};
