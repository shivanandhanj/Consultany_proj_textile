const Review = require("../models/review.model");

const express = require("express");
const router = express.Router();

const Product = require("../models/product.model");

// Create a new review
const review=async (req, res) => {
    try {
        const { user, rating, comment } = req.body;
        const { productId } = req.params;

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Create a new review
        const newReview = new Review({ product: productId, user, rating, comment });
        await newReview.save();

        // Add review to the product's reviews array
        product.reviews.push(newReview._id);
        await product.save();

        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {review};
