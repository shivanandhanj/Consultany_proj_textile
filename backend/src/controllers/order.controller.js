const Order=require('../models/order.model')
const Product=require('../models/product.model')
const Cart=require('../models/cart.model');
const razorpay=require('../config/razorpay');
const session=async(req,res)=>{

try {
        const { userId, cartItems, shippingAddress } = req.body;
        console.log("Received checkout request:", req.body); // Debugging

        
        const validatedItems = await Promise.all(cartItems.map(async (item) => {
            const product = await Product.findById(item.productId);
            if (!product || product.stockQuantity < item.quantity) {
                throw new Error(`Product ${item.productId} is out of stock`);
            }
            return {
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
                selectedColor: item.selectedColor,
                selectedSize:item.selectedSize

            };
        }));

        const totalAmount =await validatedItems.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0);

        const options = {
            amount: totalAmount * 100, // Amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1 
        };
        const razorpayOrder = await razorpay.orders.create(options);



        // Calculate total
        

        // Create order
        const newOrder = new Order({
            userId,
            items: validatedItems,
            shippingAddress,
            totalAmount,    
             paymentDetails: {
                orderId: razorpayOrder.id,
                status: "pending"
            }
        });

        const savedOrder= await newOrder.save();
       

        for (const item of cartItems) {
            const product = await Product.findById(item.productId);
             if (!product) {
              return res.status(404).json({ error: "Product not found" });
            }
            const variant = product.variants.find(
              (v) => v.size === item.selectedSize && v.color === item.selectedColor
            );
            console.log(variant);
            if (!variant) {
                console.log("variant error");
              return res.status(400).json({ error: "Variant not found" });
            }
      
            // Check if stock is sufficient
            if (variant.stock < item.quantity) {
              return res.status(400).json({ error: `Not enough stock for ${product.name} (${variant.size}, ${variant.color})` });
            }
      
            // Reduce stock
            variant.stock -= item.quantity;
      
            // Save updated product
            await product.save();
          }
        

        // Clear cart after successful order creation
        await Cart.deleteMany({ userId });

        

        res.json({ success: true, razorpayOrder, savedOrder });

    } catch (error) {
        
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const checkout=async(req,res)=>{
    try {
        const { orderId, paymentDetails } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }

        // Update order with payment details
        // order.paymentDetails = paymentDetails;
        // order.status = 'processing';
        // await order.save();

        // Update product stock
        await Promise.all(order.items.map(async (item) => {
            await Product.findByIdAndUpdate(
                item.productId,
                { $inc: { stockQuantity: -item.quantity } }
            );
        }));

        res.json({
            success: true,
            order: order
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }

}

const getAllOrders=async(req,res)=>{
    try{

        const result=await Order.find()
        .populate("userId" ,"name email")
        .populate("items.productId","name price images")
        .exec();
        res.status(200).json({
            success:true,
            data:result
        });

    }catch(error){res.status(400).json({
        success:false,
        message:error.message
    })};
}

module.exports={session,checkout,getAllOrders};