const Order=require('../models/order.model')

const session=async(req,res)=>{

try {
        const { userId, cartItems, shippingAddress } = req.body;

        // Validate cart items and check stock
        const validatedItems = await Promise.all(cartItems.map(async (item) => {
            const product = await Product.findById(item.productId);
            if (!product || product.stockQuantity < item.quantity) {
                throw new Error(`Product ${item.productId} is out of stock`);
            }
            return {
                productId: item.productId,
                quantity: item.quantity,
                price: product.price
            };
        }));

        // Calculate total
        const totalAmount = validatedItems.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0);

        // Create order
        const order = new Order({
            userId,
            items: validatedItems,
            shippingAddress,
            totalAmount,
            status: 'pending'
        });

        await order.save();

        // Clear cart after successful order creation
        await CartItem.deleteMany({ userId });

        res.json({
            orderId: order._id,
            totalAmount,
            success: true
        });
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
        order.paymentDetails = paymentDetails;
        order.status = 'processing';
        await order.save();

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

module.exports={session,checkout};