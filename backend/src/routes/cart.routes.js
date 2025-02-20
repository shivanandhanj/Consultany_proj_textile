const express = require("express");
const router = express.Router();

const cartController=require('../controllers/cart.controller')

router.get('/cart/:userId',cartController.Getcart);
router.post('/carts/add',cartController.Addcart);
router.put('/cart/:itemId',cartController.Updatecart);
router.delete('/cart/:itemId',cartController.Delcart);
module.exports=router;