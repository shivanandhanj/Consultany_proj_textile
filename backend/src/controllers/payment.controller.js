const Order=require('../models/order.model')
const razorpay=require('../config/razorpay');
const crypto = require('crypto');
const orderPayment=async(req,res)=>{
    try {
       
        console.log(body);
        console.log('bakend orderPayment got received')
        const { amount, currency = 'INR', receipt = 'receipt_order_' + Date.now() } = req.body;
        
        const options = {
          amount: amount * 100, // amount in smallest currency unit (paisa)
          currency,
          receipt,
          payment_capture: 1 // auto capture
        };
        
        const order = await razorpay.orders.create(options);
        res.json(order);
      } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
      }


}
const verifyPayment=async(req,res)=>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    console.log(req.body);
    

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        // Update order status to "paid"
        await Order.findOneAndUpdate(
            { "paymentDetails.orderId": razorpay_order_id },
            {
                $set: {
                    "paymentDetails.paymentId": razorpay_payment_id,
                    "paymentDetails.signature": razorpay_signature,
                    "paymentDetails.status": "paid"
                }
            },
            { new: true }
        );

        res.json({ success: true, message: "Payment verified and order updated" });
    } else {
        // Update order status to "failed"
        await Order.findOneAndUpdate(
            { "paymentDetails.orderId": razorpay_order_id },
            {
                $set: { "paymentDetails.status": "failed" }
            },
            { new: true }
        );

        res.status(400).json({ success: false, message: "Payment verification failed" });
    }
}
module.exports={orderPayment,verifyPayment}