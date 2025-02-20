const express=require('express');
const router=express.Router();

const Order=require('../controllers/order.controller')

router.post('/order/checkout/complete',Order.checkout);
router.post('/order/checkout',Order.session);

module.exports=router;