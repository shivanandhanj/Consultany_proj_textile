const express=require('express');
const router=express.Router();
const reviewController=require('../controllers/review.controller');

router.get("/",reviewController.review);


module.exports=router