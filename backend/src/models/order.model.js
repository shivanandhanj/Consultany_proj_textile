const mongoose =require("mongoose");

const OrderSchema=new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId,ref:'User' },

items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number
}],

shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    postalCode: String,
    country: String,
    contact: String,
},
paymentDetails: {
    method: String,
    status: String,
    transactionId: String
},
totalAmount: Number,
status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending'
},
createdAt: { type: Date, default: Date.now }

});

module.exports=mongoose.model('Order',OrderSchema);