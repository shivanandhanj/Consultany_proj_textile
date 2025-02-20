const mongoose=require("mongoose")

const CartSchema= new mongoose.Schema(
    {
        userId:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
   
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    selectedColor: String,
      selectedSize: String,
    
    },
    {timestamps:true}
);

module.exports=mongoose.model("Cart",CartSchema);