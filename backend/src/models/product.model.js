const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String, enum: ["Men", "Women"], required: true },
        subcategory: { type: String, required: true },
        brand: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        discount_price: { type: Number, required: true },
        size: {
            type: [String],
            enum: ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38", "40", "42", "44"],
            
          },
          
        color: { type: [String],  },
        variants: [
            {
              size: {
                type: String,
                enum: ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38", "40", "42", "44"],
                required: true,
              },
              color: { type: String, required: true },
              stock: { type: Number, required: true, default: 0 }, // ✅ Stock count
            }
          ],
        fabric: { type: String, required: true },
        pattern: { type: String, required: true },
        sleeve_length: { type: String, required: true },
        fit: { type: String, required: true },
        occasion: { type: String, required: true },
        stock: { type: Number, required: true, min: 0 },
        images: { type: [String], required: true }, // Store image URLs
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    },
    { timestamps: true } // Automatically creates createdAt and updatedAt fields
);

const Product = mongoose.model("Product", productSchema);


module.exports =Product;
