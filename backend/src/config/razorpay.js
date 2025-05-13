require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });


const Razorpay = require('razorpay');

console.log(process.env.RAZORPAY_KEY_SECRET)
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });


  module.exports=razorpay;