const express = require("express");
const router = express.Router();
const paymentController=require('../controllers/payment.controller');

router.post('/create-order',paymentController.orderPayment);
router.post('/verify-payment',paymentController.verifyPayment);
module.exports=router;