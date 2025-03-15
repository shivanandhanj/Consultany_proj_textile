const Cart=require('../models/cart.model')

const Addcart=async(req,res)=>{
    console.log("add");
    const {userId,productId,quantity,selectedColor,
        selectedSize}=req.body;

    console.log(userId,productId,quantity,selectedColor,
        selectedSize);
    let cartItems = await Cart.findOne({ userId, productId,selectedColor,
        selectedSize});
    if (cartItems) {
        // Update quantity if item exists
        cartItems.quantity += quantity;
        await cartItems.save();
    } else {
        // Create new cart item if it doesn't exist
        cartItems = new Cart({
            userId,
            productId,
            quantity,
            selectedColor,
      selectedSize,
        });
        await cartItems.save();
    }

    res.status(200).json({ message: "Cart updated successfully", cartItems }); // ✅ Send response

}

const Getcart=async(req,res)=>{
    try {
        const cartItems = await Cart.find({ userId: req.params.userId })
            .populate('productId');
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const Updatecart=async(req,res)=>{
    console.log("update");
    try{
        const{quantity}=req.body;
        const cartItem = await Cart.findByIdAndUpdate(
            req.params.itemId,
            { quantity },
            { new: true }
        ).populate('productId');
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        
        res.json(cartItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    
}

const Delcart=async(req,res)=>{
    try {
        const cartItem = await Cart.findByIdAndDelete(req.params.itemId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports={Updatecart,Delcart,Getcart,Addcart}